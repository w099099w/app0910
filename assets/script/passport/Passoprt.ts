import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import Loading from "./Loading";
import Login from "./Login";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Passport extends cc.Component {
    
    private cl_loading:Loading;
    private cl_login:Login;
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
        cc.find('popup/useragree',this.node).active = false;

        cc.find('common',this.node).active = true;
        cc.find('common/mask',this.node).active = false;
        cc.find('common/toast',this.node).active = false;
    }
    onLoad(){
        this.resetView();
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        this.cl_loading = new Loading(this.node,this.lauchingFinished.bind(this));
        this.cl_login = new Login(this.node);
    }
    start () {
        if(SceneManager.getInstance().getIsFirstLoad()){
            this.cl_loading.Startlauching();
        }else{
            this.cl_loading.hide();
            this.lauchingFinished();
        }
    }
    // update (dt) {}
    onDestroy(){
        MyAnimation.onDestory();
        this.cl_login.onDestroy();
        this.cl_loading.onDestory();
    }
}

