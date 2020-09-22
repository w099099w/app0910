import Notice from "../common/Notice";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import HallModelManager from "./HallModelManager";


interface HallPrefabArr{
    PopupLeftButton:cc.Prefab;
}

const {ccclass, property} = cc._decorator;


@ccclass
export default class HallViewManager extends cc.Component {
    private cl_ModelManager:HallModelManager;
    @property(cc.Prefab)
    popupLeftButton = null;
    private m_hallPrefabArr:HallPrefabArr;
    onLoad () {
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Notice.getInstance().setRootNode(cc.find('top/notice',this.node));
        Notice.getInstance().debug();
        //初始化结构
        this.m_hallPrefabArr = {PopupLeftButton:null};
        this.m_hallPrefabArr.PopupLeftButton = this.popupLeftButton;
        this.cl_ModelManager = HallModelManager.getInstance(this.node,this.m_hallPrefabArr);
        //初始化所有模块
        this.cl_ModelManager.init();
    }
    start(){
        this.cl_ModelManager.start();
    }
    onDestroy(){
        Notice.getInstance().onDestroy();
        this.cl_ModelManager.onDestroy();
    }
}
