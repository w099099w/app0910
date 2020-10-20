import Load from "../common/Load";
import Notice from "../common/Notice";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import AudioManager from "../units/AudioManager";
import HallModelManager from "./HallModelManager";

const {ccclass, menu,property} = cc._decorator;
@ccclass
@menu('场景主脚本/Hall')
export default class Hall extends cc.Component {
    private cl_ModelManager:HallModelManager;
    @property(cc.Prefab)
    popupLeftButton = null;
    private m_hallPrefabArr:HallPrefabArr;
    onLoad () {
        this.initAudio();
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Load.getInstance().setRootNode(cc.find('common/load', this.node));
        Notice.getInstance().setRootNode(cc.find('top/notice',this.node));
        Notice.getInstance().debug();
        //初始化结构
        this.m_hallPrefabArr = {PopupLeftButton:null};
        this.m_hallPrefabArr.PopupLeftButton = this.popupLeftButton;
        this.cl_ModelManager = HallModelManager.getInstance(this.node,this.m_hallPrefabArr);
        //初始化所有模块
        this.cl_ModelManager.init();
    }
    initAudio() {
        if(AudioManager.getInstance().getBgmCode() !== BGM_CODE.BGM_PASSPORT){
            AudioManager.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT, true);
            AudioManager.getInstance().setBgmVol();
            AudioManager.getInstance().setEffVol();
        }
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
        Load.getInstance().onDestroy();
        Notice.getInstance().onDestroy();
        this.cl_ModelManager.onDestroy();
    }
}
