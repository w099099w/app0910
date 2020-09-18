import Notice from "../common/Notice";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import ModelManager from "./ModelManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HallViewManager extends cc.Component {
    private cl_ModelManager:ModelManager;
    onLoad () {
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        this.cl_ModelManager = ModelManager.getInstance(this.node);
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Notice.getInstance().setRootNode(cc.find('top/notice',this.node));
        Notice.getInstance().debug();
        //初始化所有模块
        this.cl_ModelManager.init();
        
            
    }
    start(){
        this.cl_ModelManager.start();
    }
}
