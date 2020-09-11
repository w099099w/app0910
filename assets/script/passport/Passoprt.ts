import SceneManager from "../units/SceneManager";
import Loading from "./Loading";
import Login from "./Login";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Passport extends SceneManager {
    
    private c_loading:Loading;
    private c_Login:Login;
    public lauchingFinished(){
        console.log('加载完成');
        this.c_Login.show();
    }
    onLoad(){
        this.setScene(cc.director.getScene());
        this.c_loading = new Loading(this.node,this.lauchingFinished.bind(this));
        this.c_Login = new Login(this.node);
    }
    start () {
        this.c_loading.Startlauching();
        
    }
    // update (dt) {}
}

