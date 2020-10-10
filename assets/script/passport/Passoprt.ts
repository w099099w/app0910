import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import AudioManager from "../units/AudioManager";
import UserConfig from "../units/UserConfig";
import Loading from "./Loading";
import Login from "./Login";
import Version from "./Version";
import Dialog from "../common/Dialog";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Passport extends cc.Component {
    
    private cl_loading:Loading;
    private cl_login:Login;
    private cl_version:Version;
    public lauchingFinished(){
        this.cl_login.show();
    }
    resetView(){
        cc.find('logo',this.node).active = true;
        cc.find('login',this.node).active = false;
        cc.find('loading',this.node).active = true;
        cc.find('tiplabel',this.node).active = true;
        
        cc.find('popup',this.node).active = false;
        cc.find('popup/mask',this.node).active = false;
        cc.find('popup/forgetpd',this.node).active = false;
        cc.find('popup/regist',this.node).active = false;
        cc.find('popup/useragree',this.node).active = false;

        cc.find('common',this.node).active = true;
        cc.find('common/mask',this.node).active = false;
        cc.find('common/toast',this.node).active = false;
    }
    onLoad(){
        this.resetView();
        //初始化音频
        UserConfig.getInstance();
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Dialog.getInstance().setRootNode(this.node);
        this.cl_version = this.node.getComponent(Version);
        this.cl_loading = new Loading(this.node,this.lauchingFinished.bind(this));
        this.cl_login = new Login(this.node);
        if(cc.sys.localStorage.getItem('hotUpdateVer')){
            cc.find('loading/version/value', this.node).getComponent(cc.Label).string = '版本号: '+cc.sys.localStorage.getItem('hotUpdateVer');
        }else{
            cc.find('loading/version/value', this.node).getComponent(cc.Label).string = '版本号: '+JSON.parse(JSON.parse(this.cl_version.manifest._nativeAsset).version).hotUpdate;
        }
        
    }
    initAudio(){
        AudioManager.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT,true);
        AudioManager.getInstance().setBgmVol();
        AudioManager.getInstance().setEffVol();
    }
    start () {
        this.cl_loading.runShader();
        if(SceneManager.getInstance().getIsFirstLoad()){
            this.initAudio();
            this.cl_version.validate((code)=>{
                switch(code){
                    case 1:Dialog.getInstance().push('提示',1, '本地更新文件查找失败,请重新下载安装本应用!',DIALOG.MB_YES,this.versionResult.bind(this),{code:1});break;
                    case 2:Dialog.getInstance().push('提示',1, '远程更新文件下载失败,请稍后再试!',DIALOG.MB_YES,this.versionResult.bind(this),{code:2});break;
                    case 3:Dialog.getInstance().push('提示',1, '读取本地更新文件失败,请重启应用后再试!',DIALOG.MB_YES,this.versionResult.bind(this),{code:3});break;
                    case 4:Dialog.getInstance().push('错误',0, 'android版本包版本不是最新的,请下载最新安装包安装!',DIALOG.MB_YES,this.versionResult.bind(this),{code:4});break;
                    case 5:Dialog.getInstance().push('警告',2, '当前运行环境为非原生系统无法热更新,未更新的版本可能出现错误!',DIALOG.MB_YES,this.versionResult.bind(this),{code:5});break;
                    case 0:{
                        this.cl_loading.Startlauching();
                    }
                }
            })
        }else{
            this.cl_loading.hide();
            this.lauchingFinished();
        }
    }
    private versionResult(result){
        if(result['ctrl'] === DIALOG.MB_YES){
            switch(result['params']['code']){
                case 1:
                case 2:
                case 3:
                case 4:cc.game.end();break;
                case 5:this.cl_loading.Startlauching();break;
            }
        }
    }
    // update (dt) {}
    onDestroy(){
        MyAnimation.onDestory();
        this.cl_login.onDestroy();
        this.cl_loading.onDestory();
    }
}

