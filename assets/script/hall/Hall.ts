import Notice from "../common/Notice";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import HallModelManager from "./HallModelManager";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Hall extends cc.Component {
    private cl_ModelManager:HallModelManager;
    @property(cc.Prefab)
    popupLeftButton = null;
    @property(cc.Prefab)
    other = null;
    private m_hallPrefabArr:HallPrefabArr;
    onLoad () {
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Notice.getInstance().setRootNode(cc.find('top/notice',this.node));
        Notice.getInstance().debug();
        //初始化结构
        this.m_hallPrefabArr = {PopupLeftButton:null,otherL:null};
        this.m_hallPrefabArr.PopupLeftButton = this.popupLeftButton;
        this.m_hallPrefabArr.otherL = this.other
        this.cl_ModelManager = HallModelManager.getInstance(this.node,this.m_hallPrefabArr);
        //初始化所有模块
        this.cl_ModelManager.init();
    }
    //scrollview渲染节点
    RenderMoneyFlow(Item:cc.Node,Index:number){
        this.cl_ModelManager.cl_MoneyFlowView.renderMoneyFlowFunction(Item,Index);
    }
    RenderMainRecord(Item:cc.Node,Index:number){
        this.cl_ModelManager.cl_RecordView.RenderMainFunction(Item,Index);
    }
    RenderPopupRecord(Item:cc.Node,Index:number){
        this.cl_ModelManager.cl_RecordView.RenderPopupFunction(Item,Index);
    }
    //scrollview子节点点击
    ClickRecordMainNode(Item:cc.Node,Index:number,LastId:number){
        this.cl_ModelManager.cl_RecordView.clickMainItemFunction(Item,Index,LastId);
    }
    ClickRecordPopupNode(Item:cc.Node,Index:number,LastId:number){
        this.cl_ModelManager.cl_RecordView.clickPopupItemFunction(Item,Index,LastId);
    }
    start(){
        this.cl_ModelManager.start();
    }
    Toast(val,w,h){
        Toast.getInstance().show('文件路径'+val+'图像宽'+w+'图像高'+h,this.node.getChildByName('common/toast'));
    }
    onDestroy(){
        Notice.getInstance().onDestroy();
        this.cl_ModelManager.onDestroy();
    }
}
