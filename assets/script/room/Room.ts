import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import RecordView from "../hall/popup/RecordView";
import SetView from "../common/SetView";
import GameView from "./GameView";
import RoomView from "./RoomView";
import RuleView from "./RuleView";
import TopView from "./TopView";
import AudioManager from "../units/AudioManager";

const {ccclass,menu, property} = cc._decorator;
@ccclass
@menu('场景主脚本/Room')
export default class RoomViewManager extends cc.Component {
    private cl_GameView:GameView;
    private cl_RoomView:RoomView;
    private cl_TopView:TopView;
    private cl_RecordView:RecordView;
    private cl_SetView:SetView;
    private cl_RuleView:RuleView;
    @property(cc.Prefab)
    PopupButton:cc.Prefab = null;
    onLoad () {
        this.initAudio();
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        this.cl_RecordView = new RecordView(this.node,this.PopupButton);
        this.cl_SetView = new SetView(this.node);
        this.cl_TopView = new TopView(this.node,this.cl_RecordView,this.cl_SetView);
        this.cl_RuleView = new RuleView(cc.find('popup',this.node));
        this.cl_RoomView = new RoomView(this.node,this.cl_RuleView);
        this.cl_GameView = new GameView(this.node,this.cl_RoomView);
    }
    initAudio() {
        if(AudioManager.getInstance().getBgmCode() !== BGM_CODE.BGM_PASSPORT){
            AudioManager.getInstance().playBgmFromLocal(BGM_CODE.BGM_PASSPORT, true);
            AudioManager.getInstance().setBgmVol();
            AudioManager.getInstance().setEffVol();
        }
    }
    //scrollview渲染节点
    RenderRoom(Item:cc.Node,Index:number){
        this.cl_RoomView.RenderMainFunction(Item,Index);
    }
    ClickTable(Item:cc.Node,Index:number,LastId:number,ClickPos:RoomTableClick){
        this.cl_RoomView.clickMainFunction(Item,Index,LastId,ClickPos);
    }
    //scrollview渲染节点
    RenderMainRecord(Item:cc.Node,Index:number){
        this.cl_RecordView.RenderMainFunction(Item,Index);
    }
    RenderPopupRecord(Item:cc.Node,Index:number){
        this.cl_RecordView.RenderPopupFunction(Item,Index);
    }
    //scrollview子节点点击
    ClickRecordMainNode(Item:cc.Node,Index:number,LastId:number){
        this.cl_RecordView.clickMainItemFunction(Item,Index,LastId);
    }
    ClickRecordPopupNode(Item:cc.Node,Index:number,LastId:number){
        this.cl_RecordView.clickPopupItemFunction(Item,Index,LastId);
    }
    button_back(){
        SceneManager.getInstance().loadScene('hall');
    }
    start(){
        this.cl_SetView.start();
        this.cl_GameView.start();
        this.cl_RecordView.start();
    }
    onDestroy(){
        MyAnimation.onDestory();
        this.cl_RoomView.OnDestroy();
        this.cl_GameView.onDestroy();
        this.cl_RecordView.onDestroy();
    }
}
