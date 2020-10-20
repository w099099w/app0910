import SceneManager from "../common/SceneManager";
import Tool from "./Tool";

export default class HttpRequest {
    private static outTimer: number;
    private static requestRootUrl: string;
    private static HttpCache: XMLHttpRequest[];
    public static Token: string;
    public static InitConfig() {
        HttpRequest.HttpCache = [];
        HttpRequest.outTimer = 5000;
        HttpRequest.requestRootUrl = 'http://47.108.74.232:8181';
    }
    private static ajax(Method: string, Route: string, RequestData: Object, ProgressFunction: EventListenerOrEventListenerObject, Host): Promise<HttpReq> {
        let key = HttpRequest.HttpCache.length;
        if (Route !== '') {
            if (Host) {
                Route = Host + Route;
            } else {
                Route = HttpRequest.requestRootUrl + Route;
            }
        }
        const token = HttpRequest.Token;
        return new Promise<HttpReq>((resolve, reject) => {
            // 创建XMLHttpRequest对象
            const xhr = new XMLHttpRequest();
            //设置请求超时
            xhr.timeout = HttpRequest.outTimer;
            //函数绑定
            xhr.onload = function () {
                HttpRequest.HttpCache[key] = null;
                if (xhr.status === 200) {
                    let result:HttpReq = JSON.parse(xhr.responseText);
                    resolve(result);
                } else {
                    if (xhr.status == 0) {
                        reject({ code: 'erroe',message: "连接服务器失败",data:null});
                        return;
                    } if (xhr.status == 401) {
                        reject({ code: 'error', message: '登录已失效,请重新登录',data:null});
                        setTimeout(() => {
                            SceneManager.getInstance().loadScene('passport');
                        }, 1500);
                        return;
                    }
                    let JsonData = Tool.isJsonStr(xhr.responseText);
                    if (JsonData) {
                        reject(JsonData);
                    } else {
                        reject(JSON.parse(JSON.stringify({ code: 'erroe', message: xhr.responseText ,data:null})));
                    }
                }
            }
            //连接出错
            xhr.onerror = function () {
                reject({ "code": 'erroe', "message": "连接服务器失败" });
                HttpRequest.HttpCache[key] = null;
            }
            xhr.onloadend = function () {
                if (xhr.readyState === 4 && xhr.status === 0 || JSON.stringify(xhr) === '{}') {
                    reject({ "code": 'erroe', "message": "连接服务器失败" });
                }
                HttpRequest.HttpCache[key] = null;
            }
            xhr.ontimeout = function (e) {
                reject({ "data": e, "code": 'erroe', "message": "连接服务器超时,请检查网络连接或联系客服!" });
                HttpRequest.HttpCache[key] = null;
            }
            if (cc.sys.os !== cc.sys.OS_WINDOWS && cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys.OS_IOS) {
                xhr.upload.addEventListener("progress", ProgressFunction);
            }
            // get
            if (Method === 'get' || Method === 'GET') {
                if (typeof RequestData === 'object') {
                    // params拆解成字符串
                    RequestData = Object.keys(RequestData)
                        .map(key => {
                            return (
                                encodeURIComponent(key) + '=' + encodeURIComponent(RequestData[key])
                            )
                        })
                        .join('&')
                }
                Route = RequestData ? Route + '?' + RequestData : Route
                xhr.open(Method, Route, true)
                if (token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                }
                xhr.send()
            } else if (Method === 'post' || Method === 'POST') {
                xhr.open(Method, Route, true)
                if (token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                }
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(RequestData))
            } else if (Method === 'delete' || Method === 'DELETE') {
                xhr.open(Method, Route, true)
                if (token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                }
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.send(JSON.stringify(RequestData))
            } else if (Method === 'put' || Method === 'PUT') {
                xhr.open(Method, Route, true)
                if (token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                }
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(RequestData))
            }
            HttpRequest.HttpCache[key] = xhr;
        })
    }
    public static Req(Method: string, Route: string, params: object, Loading: any, Success: Function = null, Failed: Function = null, ProgressFunction: EventListenerOrEventListenerObject = null) {
        if (Loading) {
            Loading.show('', HttpRequest.outTimer);
        }
        HttpRequest.ajax(Method, Route, params, ProgressFunction, null)
            .then(res => {
                !CC_JSB || CC_DEBUG ? console.log(Route + ' request success', JSON.parse(JSON.stringify(res))) : null;
                if (Loading) {
                    Loading.hide();
                }
                Success ? Success(res ? res : null) : {};
            })
            .catch(error => {
                !CC_JSB || CC_DEBUG ? console.log(Route + ' request failed', error) : null;
                if (Loading) {
                    Loading.hide();
                }
                Failed ? Failed(error) : {};
            });
    }
    public static onDestroy() {
        for (let k in HttpRequest.HttpCache) {
            if (HttpRequest.HttpCache[k]) {
                HttpRequest.HttpCache[k].abort();
            }
        }
    }
}
