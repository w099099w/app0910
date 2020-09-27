import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";
import ShareView from "../popup/ShareView";
import PlayView from "../popup/PlayView";
import MsgView from "../popup/MsgView";
import SetView from "../popup/SetView";
import AgentView from "../popup/AgentView";
import RecordView from "../popup/RecordView";

export class MNavbar extends MyAnimation{
    private S_shareState:number;
    private S_palyState:number;
    private S_recordState:number;
    private S_menuState:number;
    private S_agentState:number;
    private S_feedBackState:number;
    private S_messageState:number;
    private S_setState:number;

    public constructor(){
       super();
       //一级导航条
       //BUTTON_STATE.OFF;
       this.S_recordState =  this.S_palyState = this.S_shareState = this.S_menuState=BUTTON_STATE.ON;
       //二级导航条
       this.S_messageState = this.S_setState = this.S_agentState = BUTTON_STATE.ON;
       this.S_feedBackState =  BUTTON_STATE.OFF; 
    }

    public getShareButtonState(){
        return this.S_shareState;
    }

    public getPlayButtonState(){
        return this.S_palyState;
    }

    public getRecordButtonState(){
        return this.S_recordState;
    }

    public getMenuButtonState(){
        return this.S_menuState;
    }

    public getAgentButtonState(){
        return this.S_agentState;
    }

    public getFeedbackButtonState(){
        return this.S_feedBackState;
    }

    public getMessageButtonState(){
        return this.S_messageState;
    }

    public getSetButtonState(){
        return this.S_setState;
    }
}


export default class Navbar extends MNavbar{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_menuSecond:cc.Node;

    private i_allTouch:cc.Node;

    private i_share:cc.Node;
    private i_play:cc.Node;
    private i_record:cc.Node;
    private i_menu:cc.Node;


    private i_agent:cc.Node;
    private i_feedBack:cc.Node;
    private i_message:cc.Node;
    private i_set:cc.Node;

    private cl_ShareView: ShareView;
    private cl_PlayView:PlayView;
    private cl_MsgView:MsgView;
    private cl_SetView:SetView;
    private cl_AgentView:AgentView;
    private cl_RecordView:RecordView

    public constructor(Node:cc.Node,ShareView:ShareView,PlayView:PlayView,MsgView:MsgView,SetView:SetView,AgentView:AgentView,RecordView:RecordView){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_menuSecond = cc.find('navmenu/layout/menu/alltouch/secondmenu',this.node);

        this.i_allTouch = cc.find('navmenu/layout/menu/alltouch',this.node);

        this.i_share = cc.find('navmenu/layout/share/icon',this.node);
        this.i_play = cc.find('navmenu/layout/play/icon',this.node);
        this.i_record = cc.find('navmenu/layout/record/icon',this.node);
        this.i_menu = cc.find('navmenu/layout/menu/icon',this.node);
        this.i_agent = cc.find('navmenu/layout/menu/alltouch/secondmenu/icon_agent',this.node);
        this.i_feedBack = cc.find('navmenu/layout/menu/alltouch/secondmenu/icon_feedback',this.node);
        this.i_message = cc.find('navmenu/layout/menu/alltouch/secondmenu/icon_message',this.node);
        this.i_set = cc.find('navmenu/layout/menu/alltouch/secondmenu/icon_set',this.node);
        this.cl_ShareView = ShareView;
        this.cl_PlayView = PlayView;
        this.cl_MsgView = MsgView;
        this.cl_SetView = SetView;
        this.cl_AgentView = AgentView;
        this.cl_RecordView = RecordView;
        this.m_menuSecond.active = false;
        this.addevent();
    }
    public showSecondMenu(){
        this.OpenScaleX(this.m_menuSecond,null,this.secondMenuAddEvent.bind(this));
    }
    public hideSecondMenu(){
        this.CloseScaleX(this.m_menuSecond,null,this.secondMenuHideEvent.bind(this));
    }   
    private secondMenuAddEvent(){
        this.i_allTouch.on('touchend',()=>{
            this.hideSecondMenu();
            this.secondMenuHideEvent();
        },this)
        this.i_agent.on('touchend',()=>{
            if(this.click_Agent()){
                this.hideSecondMenu();
                this.secondMenuHideEvent();
            }
        },this)
        this.i_feedBack.on('touchend',()=>{
            if(this.click_FeedBack()){
                this.hideSecondMenu();
                this.secondMenuHideEvent();
            }
        },this)
        this.i_message.on('touchend',()=>{
            if(this.click_Message()){
                this.hideSecondMenu();
                this.secondMenuHideEvent();
            }
        },this)
        this.i_set.on('touchend',()=>{
            if(this.click_Set()){
                this.hideSecondMenu();
                this.secondMenuHideEvent();
            }
        },this)
    }
    private secondMenuHideEvent(){
        this.i_allTouch.off('touchend');
        this.i_agent.off('touchend');
        this.i_feedBack.off('touchend');
        this.i_message.off('touchend');
        this.i_set.off('touchend');
    }
    private addevent(){
        this.i_share.on('touchend',()=>{
            this.click_Share();
        },this)
        this.i_play.on('touchend',()=>{
            this.click_Play();
        },this)
        this.i_record.on('touchend',()=>{
            this.click_Record();
        },this)
        this.i_menu.on('touchend',()=>{
            this.click_Menu();
        },this)
    }
    //
    public click_Share(){
        switch(this.getShareButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_ShareView.show();};break;
        }
    }  
    public click_Play(){
        switch(this.getPlayButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_PlayView.show();};break;
        }
    } 
    public click_Record(){
        switch(this.getRecordButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_RecordView.show()};break;
        }
    }
    public click_Menu(){
        switch(this.getMenuButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.showSecondMenu()};break;
        }
    }
    public click_Agent():boolean{
        switch(this.getAgentButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_AgentView.show();return true;}break;
        }
        return false;
    }  
    public click_FeedBack():boolean{
        switch(this.getFeedbackButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return true;break;
        }
        return false;
    } 
    public click_Message():boolean{
        switch(this.getMessageButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_MsgView.show();return true;}break;
        }
        return false;
    }
    public click_Set():boolean{
        switch(this.getSetButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_SetView.show();return true;}break;
        }
        return false;
    }
    
    public start(){
        
    }
    public onDestory(){
        
    }
}

