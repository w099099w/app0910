import Home from "./base/Home"
import Left from "./base/Left";
import Navbar from "./base/Navbar";
import ShareView from "./popup/ShareView";
import PlayView from "./popup/PlayView";
import MsgView from "./popup/MsgView";
import SetView from "../common/SetView";
import AgentView from "./popup/AgentView";
import MyAnimation from "../common/MyAnimation";
import UserView from "./base/User";
import ResetPdView from "./popup/ResetPdView"
import RealNameView from "./popup/RealNameView";
import MoneyFlowView from "./popup/MoneyFlowView";
import RecordView from "./popup/RecordView";

export default class HallModelManager{
    private node:cc.Node;
    private m_PrefabArr:HallPrefabArr;
    private cl_Home:Home;
    private cl_Left:Left;
    private cl_Navbar:Navbar;
    private cl_ShareView:ShareView;
    private cl_PlayView:PlayView;
    private cl_MsgView:MsgView;
    private cl_SetView:SetView;
    private cl_AgentView:AgentView;
    private cl_ResetPdView:ResetPdView;
    private cl_RealNameView:RealNameView;
    public cl_MoneyFlowView:MoneyFlowView;
    public cl_RecordView:RecordView;
    private cl_UserView:UserView;
    private static m_instance:HallModelManager;
    private constructor(Node:cc.Node = null,PrefabArr:HallPrefabArr = null){
        this.node = Node;
        this.m_PrefabArr = PrefabArr;
    }
    public static getInstance(Node:cc.Node = null,PrefabArr:HallPrefabArr = null):HallModelManager{
        if(!HallModelManager.m_instance){
            HallModelManager.m_instance = new HallModelManager(Node,PrefabArr)
            return HallModelManager.m_instance;
        }
        if(!PrefabArr){
            cc.error('ErrorCode 404: 预制体数组仍未赋值,将可能导致视图组件异常');
        }
        return HallModelManager.m_instance;
    }
    public setMainNode(Node:cc.Node){
        this.node = Node;
    }
    /**
     * @description 所有该场景使用的Mode执行new
     */
    public init(){
        this.cl_Home = new Home(this.node);
        this.cl_Left = new Left(this.node);
        this.cl_ShareView = new ShareView(this.node);
        this.cl_SetView = new SetView(this.node);
        this.cl_AgentView = new AgentView(this.node);
        //预制体视图
        if(this.m_PrefabArr){
            this.cl_PlayView = new PlayView(this.node,this.m_PrefabArr.PopupLeftButton);
            this.cl_MsgView = new MsgView(this.node,this.m_PrefabArr.PopupLeftButton);
            this.cl_RecordView = new RecordView(this.node,this.m_PrefabArr.otherL);
        }
        this.cl_Navbar = new Navbar(this.node,this.cl_ShareView,this.cl_PlayView,this.cl_MsgView,this.cl_SetView,this.cl_AgentView,this.cl_RecordView);
        this.cl_ResetPdView = new ResetPdView(this.node);
        this.cl_RealNameView = new RealNameView(this.node);
        this.cl_MoneyFlowView = new MoneyFlowView(this.node);
        this.cl_UserView = new UserView(this.node,this.cl_ResetPdView,this.cl_RealNameView,this.cl_MoneyFlowView); 
    }
    /**
     * @description 所有该场景使用的Mode执行start
     */
    public start(){
        this.cl_SetView.start();
        this.cl_Home.start();
        this.cl_Left.start();
        this.cl_ShareView.start();
        this.cl_PlayView.start();
        this.cl_MsgView.start();
        this.cl_AgentView.start();
        this.cl_RecordView.start();
        this.cl_Navbar.start();
        this.cl_ResetPdView.start();
        this.cl_RealNameView.start();
        this.cl_MoneyFlowView.start();
        this.cl_UserView.start();
    }
    public onDestroy(){
        HallModelManager.m_instance = null;
        MyAnimation.onDestory();
        this.cl_Home.onDestory();
        this.cl_Left.onDestory();
        this.cl_ShareView.onDestory();
        this.cl_PlayView.onDestory();
        this.cl_MsgView.onDestory();
        this.cl_AgentView.onDestory();
        this.cl_SetView.onDestory();
        this.cl_RecordView.onDestroy();
        this.cl_Navbar.onDestory();
        this.cl_ResetPdView.onDestory();
        this.cl_RealNameView.onDestory();
        this.cl_MoneyFlowView.onDestory();
        this.cl_UserView.onDestory();
    }
}
