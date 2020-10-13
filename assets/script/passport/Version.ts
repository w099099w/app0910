import SceneManager from "../common/SceneManager";
import AudioManager from "../units/AudioManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Version extends cc.Component {
    @property(cc.Asset)
    manifest: cc.Asset = null;
    private am: jsb.AssetsManager;
    private downloadUrl: string;
    private downSize: string;
    private totalSize: string;
    private index: number;
    private index2: number;
    private byte: number;
    private speedtimer: number;
    private timer: number;
    private updating: boolean;
    private callback: Function;
    private stateStr: cc.Label;
    private detailStr: cc.Label;
    private verStr: cc.Label;
    private bar: cc.ProgressBar;
    private root:cc.Node;
    private remoteVersion:string;
    private flush:number;

    public onLoad() {
        this.am = null;
        this.downloadUrl = null;
        this.root = cc.find('loading',this.node);
        this.stateStr = cc.find('loading/progress/state/content', this.node).getComponent(cc.Label);
        this.detailStr = cc.find('loading/progress/state/detail', this.node).getComponent(cc.Label);
        this.verStr = cc.find('loading/version/value', this.node).getComponent(cc.Label);
        this.bar = cc.find('loading/progress', this.node).getComponent(cc.ProgressBar);
        this.index = this.index2 = this.byte = 0;
        this.flush = 0;
    }

    public show() {
        this.bar.progress = 0;
        this.root.active = true;
    }
    public hide() {
        this.bar.progress = 0;
        this.root.active = false;
    }

    private compare(curV, reqV) {
        if (curV && reqV) {
            var arr1 = curV.split('.'),
                arr2 = reqV.split('.');
            var minLength = Math.min(arr1.length, arr2.length),
                position = 0,
                diff = 0;
            while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
                position++;
            }
            diff = (diff != 0) ? diff : (arr1.length - arr2.length);
            return diff < 0 ? -1 : 1;
        }
        return 1;
    }
    public onDestroy = function () {
        if (this.speedtimer) {
            clearTimeout(this.speedtimer)
        }
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = null
        this.speedtimer = null;
    }

    public validate(callback:Function) {
        this.stateStr.string = '状态: 非原生,系统将不进行更新!'
        if(cc.sys.localStorage.getItem('hotUpdateVer')){
            this.verStr.string = '版本号: '+cc.sys.localStorage.getItem('hotUpdateVer');
        }else{
            this.verStr.string = '版本号: '+JSON.parse(JSON.parse(this.manifest._nativeAsset).version).hotUpdate;
        }
        if (!cc.sys.isNative || this.am) {
            this.stateStr.string = '状态: 非原生,系统将不进行更新!'
            this.timer = setTimeout(()=>{
                this.hide();
                callback(5);
            },2000);
            return true;
        }
        this.stateStr.string = '状态: 正在检查更新...'
        this.callback = callback
        //下载路径
        var path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'testupdate/');
        cc.sys.localStorage.setItem('storagePath', path);
        //创建目录
        if (!jsb.fileUtils.isDirectoryExist(path)) {
            jsb.fileUtils.createDirectory(path)
        }

        //实例化
        this.am = new jsb.AssetsManager('', path);
        this.am.setVersionCompareHandle(function (versionA, versionB) {
            //version B远程
            //version A本地
            let curV = JSON.parse(versionA).hotUpdate;
            let reqV = JSON.parse(versionB).hotUpdate;
            let curA = JSON.parse(versionA).android;
            let reqA = JSON.parse(versionB).android;
            if (cc.sys.OS_IOS === cc.sys.os) {
                //console.log('非安卓不进行安装包版本控制')
                cc.sys.localStorage.setItem('isNewAndroidVersion', false);
            } else if (cc.sys.OS_ANDROID === cc.sys.os || cc.sys.OS_WINDOWS === cc.sys.os) {
                if (this.compare(curA, reqA) == -1) {
                    //console.log('不是最新安装包')
                    cc.sys.localStorage.setItem('isNewAndroidVersion', true);
                    return 1;
                } else {
                    //console.log('最新安装包')
                    cc.sys.localStorage.setItem('isNewAndroidVersion', false);
                }
            }
            return this.compare(curV, reqV);
        }.bind(this));
        //设置并发
        this.am.setMaxConcurrentTask(4);

        if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.manifest.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this.am.loadLocalManifest(url);
        }

        if (cc.sys.os === cc.sys.OS_IOS) {
            //this.verStr.string = '版本号: \nsoftware' + JSON.parse(this.am.getLocalManifest().getVersion()).hotUpdate;//显示当前版本号
            this.verStr.string = '版本号: ' + JSON.parse(this.am.getLocalManifest().getVersion()).hotUpdate;//显示当前版本号
        } else {
            //this.verStr.string = '版本号: \nandroid: ' + JSON.parse(this.am.getLocalManifest().getVersion()).android + '\nsoftware: ' + JSON.parse(this.am.getLocalManifest().getVersion()).hotUpdate;//显示当前版本号
            this.verStr.string = '版本号: ' + JSON.parse(this.am.getLocalManifest().getVersion()).hotUpdate;//显示当前版本号
        }
        if (!this.am.getLocalManifest() || !this.am.getLocalManifest().isLoaded()) {
            this.stateStr.string = '状态: 获取本地 manifest文件失败!';
            callback(3);
            return;
        }
        this.am.setEventCallback(this.checkCb.bind(this));
        setTimeout(() => {
            if (SceneManager.getInstance().getSceneName() == 'passport') {
                this.am.checkUpdate(); //检查更新
            }
        }, 1000)
    }

    private checkCb(event) {
        cc.log('Code:----------- ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.stateStr.string = '状态: 本地manifest文件查找失败,请重新下载安装本应用!'
                this.callback(1);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.stateStr.string = '状态: 下载manifest文件失败,请稍后再试!';
                this.callback(2);
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                if (cc.sys.localStorage.getItem('isNewAndroidVersion') == 'true') {
                    let version = this.am.getRemoteManifest().getVersion();
                    let newAndroid = JSON.parse(version).android;
                    this.stateStr.string = '状态: 当前安装包文件不是最新版本  ' + newAndroid + '  请下载最新安装包安装!'
                    this.callback(4)//返回值
                } else {
                    this.stateStr.string = "状态: 当前已经是最新版本,更新完成!";
                    this.bar.progress = 1;
                    setTimeout(() => {
                        if (SceneManager.getInstance().getSceneName() == 'passport') {
                            this.hide()
                            this.callback(0)
                        }
                    }, 3000)
                }
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                let version = this.am.getRemoteManifest().getVersion();
                let newHotUpdate = JSON.parse(version).hotUpdate;
                this.stateStr.string = '状态: 发现新版本' + newHotUpdate + '   准备更新文件...';
                this.remoteVersion = newHotUpdate;
                this.bar.progress = 0;//更新进度归0
                setTimeout(() => {
                    if (SceneManager.getInstance().getSceneName() == 'passport') {
                        this.hotUpdate();
                    }
                }, 3000);
                break;
            default:
                return;
        }
        this.am.setEventCallback(null);
        this.updating = false;
    }

    private hotUpdate() {
        if (this.speedtimer) {
            clearTimeout(this.speedtimer)
        }
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = null
        this.speedtimer = null;
        this.stateStr.string = '状态: 正在更新';
        let count = 0, dot = '';
        this.timer = setInterval(() => {
            if (count > 2) {
                count = 0;
                dot = '';
            } else {
                dot += '.';
                count++;
            }
            this.stateStr.string = '状态: 正在更新' + dot;
        }, 1000)

        if (this.am && !this.updating) {
            //console.log("正在更新===========");
            this.am.setEventCallback(this.updateCb.bind(this));

            if (this.am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifest.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this.am.loadLocalManifest(url);
            }
            this.am.update();
            this.updating = true;
        }
    }
    private updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                //console.log('No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.bar.progress = event.getPercent();//进度变更
                this.index = (event.getDownloadedBytes() / 1024 / 1024).toString().indexOf('.')
                this.downSize = (event.getDownloadedBytes() / 1024 / 1024).toString().slice(0, this.index + 3) + 'M'
                this.index2 = (event.getTotalBytes() / 1024 / 1024).toString().indexOf('.')
                this.totalSize = (event.getTotalBytes() / 1024 / 1024).toString().slice(0, this.index2 + 3) + 'M'
                if (!this.speedtimer) {
                    this.detailStr.string = this.downSize + ' / ' + this.totalSize;
                    this.speedtimer = setInterval(() => {
                        let speed: number = Math.ceil((event.getDownloadedBytes() - this.byte) / 1024);
                        if(this.flush%5 === 0){
                            if (speed >= 1024) {
                                speed = speed / 1024
                                let index3 = speed.toString().indexOf('.');
                                speed = Number(speed.toString().slice(0, index3 + 3))
                                this.detailStr.string = speed + 'MB/s  ' + this.downSize + ' / ' + this.totalSize;
                            } else {
                                this.detailStr.string = speed + 'KB/s  ' + this.downSize + ' / ' + this.totalSize;
                            }
                        }else{
                            if (speed >= 1024) {
                                speed = speed / 1024
                                let index3 = speed.toString().indexOf('.');
                                speed = Number(speed.toString().slice(0, index3 + 3))
                                this.detailStr.string = (speed*5) + 'MB/s  ' + this.downSize + ' / ' + this.totalSize;
                            } else {
                                this.detailStr.string = (speed*5) + 'KB/s  ' + this.downSize + ' / ' + this.totalSize;
                            }
                        }
                        this.byte = event.getDownloadedBytes();
                        this.flush+=1;
                    }, 200)
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                //console.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //console.log('Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                needRestart = true;
                //console.log("下载完成===================================================");
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.stateStr.string = '状态: 发现有下载失败的文件,准备重新下载...';
                setTimeout(() => {
                    if (SceneManager.getInstance().getSceneName() == 'passport') {
                        this.am.downloadFailedAssets();
                        this.updating = false;
                    }
                }, 2000)
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                needRestart = false;
                this.stateStr.string = '状态: 资源更新错误  文件: ' + event.getAssetId();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.stateStr.string = '状态: ' + event.getMessage();
                break;
            default:
                break;
        }

        if (failed) {
            this.am.setEventCallback(null);
            this.updating = false;
        }

        if (needRestart) {
            cc.sys.localStorage.setItem('hotUpdateVer',this.remoteVersion);
            if (this.speedtimer) {
                clearTimeout(this.speedtimer)
            }
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = null
            this.speedtimer = null;
            this.am.setEventCallback(null);
            var searchPaths: any = jsb.fileUtils.getSearchPaths();
            var newPaths: any = this.am.getLocalManifest().getSearchPaths();
            if (searchPaths[0] != newPaths) {
                Array.prototype.unshift.apply(searchPaths, newPaths);
            }
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            cc.sys.localStorage.removeItem('showUpdateLog');
            jsb.fileUtils.setSearchPaths(searchPaths);
            //console.log("提示重启");
            this.stateStr.string = '状态: 更新完成正在重新启动...';
            this.bar.progress = 1;
            setTimeout(() => {
                AudioManager.getInstance().stopAll();
                cc.game.restart();
            }, 2000)
        }
    }
}
