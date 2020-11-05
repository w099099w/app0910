import Load from "../common/Load";
import Tool from "./Tool";

export default class Websocket {
    private static m_instance: Websocket;
    private autoReconnect: SocketReconnect;
    private Heart: SocketHeart;
    public clientID: string;
    private websocket: WebSocket;
    private datalock: boolean;
    public openCallBack: Function;
    public closeCallBack: Function;
    private _gameMessageCallBack: WebsocketMessage;
    set gameMessageCallBack(val: WebsocketMessage) {
        this._gameMessageCallBack = val;
        if (this._gameMessageCallBack) {
            this.popupMessage();
        }
    }
    private _data_cache: SocketMessage[];
    private set data_cache(val: SocketMessage) {
        this._data_cache.push(val);
        this.popupMessage();//若还有消息继续转发
    }
    private constructor() {
        this.websocket = null;
    }
    private popupMessage() {
        if (this._data_cache.length > 0 && this.datalock === false) {
            this.datalock = true
            if (this._gameMessageCallBack) {
                let msg = this._data_cache.shift()
                this._gameMessageCallBack(msg.code, msg.data);
                this.datalock = false;
                this.popupMessage();
            } else {
                this.datalock = false;
                return;
            }
        }
    }
    public static getInstance(): Websocket {
        if (!Websocket.m_instance) {
            Websocket.m_instance = new Websocket();
            return Websocket.m_instance;
        }
        return Websocket.m_instance;
    }

    private socketOpen() {
        Tool.Log('连接ws服务器成功==========');
        if (this.Heart.interval > 0) {
            this.Heart.id = setInterval(() => {
                if (this.Heart.isRec) {
                    this.Heart.isRec = false;
                    this.send('keep', { action: 'keep', data: 'ping' });
                } else {
                    clearInterval(this.Heart.id);
                    Load.getInstance().show('网络连接异常,正在重连服务器', true);
                    this.websocket.close();
                    this.create(this.autoReconnect.url,this.autoReconnect.heartInterval,this.autoReconnect.isReconnect);
                    return;
                }
            }, this.Heart.interval);
        } else {
            cc.warn('心跳设置不合法应当设置为大于0的值');
        }
    }
    private socketClose() {
        let Heart: SocketHeart = this.Heart;
        if (Heart.id && Heart.interval > 0) {
            clearInterval(Heart.id);
            this.Heart = null;
        }
        this.websocket = null;
        if (this.autoReconnect.isReconnect) {
            Load.getInstance().show('正在重连', true);
            //记录关闭时间
            if (!this.autoReconnect.id) {
                this.autoReconnect.closeTime = Date.now();
            }
            if (this.autoReconnect.id) {
                clearInterval(this.autoReconnect.id);
                this.autoReconnect.id = null;
            }
            this.autoReconnect.id = setInterval(() => {
                if (Date.now() - this.autoReconnect.closeTime < 3000) {
                    return;
                }
                clearInterval(this.autoReconnect.id);
                this.autoReconnect.id = null;
                this.create(this.autoReconnect.url, this.autoReconnect.heartInterval, this.autoReconnect.isReconnect);
            }, 500)
        } else {
            this.autoReconnect = null;
            this.Heart = null;
        }
    }
    private socketError() {
        Tool.Log('onError==========');
    }
    private socketMessage(event) {
        let msg: SocketMessage = Tool.isJsonStr(event.data);
        if (msg) {
            if (msg.code === 'init') {
                this.clientID = msg.data.info;
                Load.getInstance().hide();
                return;
            }else if(msg.code === 'keep'){
                this.Heart.isRec = true;
                return;
            }
            this.data_cache = msg//推送到队列
        }
    }
    public close() {
        this.websocket.close();
    }
    public create(Url: string, HeartInterval: number, AutoReconnect: boolean) {
        if (this.websocket) {
            this.websocket.onclose = () => {
                this.create(Url, HeartInterval, AutoReconnect);
            };
            this.websocket.close();
        } else {
            Load.getInstance().show('正在连接服务器...', true);
            this.datalock = false
            this._data_cache = [];
            this.websocket = new WebSocket(Url + '/?old_client_id=' + (typeof this.clientID !== 'undefined' ? this.clientID : '0'));
            this.autoReconnect = {
                isReconnect: AutoReconnect,
                id: null,
                heartInterval: HeartInterval,
                closeTime: null,
                url: Url,
            };
            this.Heart = {
                isRec: true,
                id: null,
                interval: HeartInterval,
            }
            this.websocket.onopen = this.socketOpen.bind(this);
            this.websocket.onmessage = this.socketMessage.bind(this);
            this.websocket.onerror = this.socketError.bind(this);
            this.websocket.onclose = this.socketClose.bind(this);
            Tool.Log(this.websocket);
        }
    }
    public send(code, data): boolean {
        if (this.websocket != null && this.websocket.readyState === 1 && code !== null && data !== null) {
            let msg = { code: code, data: data }
            Tool.Log('websocketSend=======  ' + JSON.stringify(msg));
            this.websocket.send(JSON.stringify(msg))
            return true;
        }
        return false;
    }
}
