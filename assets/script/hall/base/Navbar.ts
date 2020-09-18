import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";
import ShareView from "../popup/ShareView";

enum BUTTON_STATE{
    OFF,
    ON
}

export class MNavbar extends MyAnimation{
    private S_shareState:number;
    private S_palyState:number;
    private S_recordState:number;
    private S_menuState:number;

    public constructor(){
       super();
       this.S_palyState = this.S_recordState = this.S_menuState =  BUTTON_STATE.OFF;
       this.S_shareState = BUTTON_STATE.ON;
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
}


export default class Navbar extends MNavbar{
    private node:cc.Node;
    private m_toast:cc.Node;

    private i_share:cc.Node;
    private i_play:cc.Node;
    private i_record:cc.Node;
    private i_menu:cc.Node;

    private cl_ShareView: ShareView;

    public constructor(Node:cc.Node,ShareView:ShareView){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);

        this.i_share = cc.find('navmenu/layout/share/icon',this.node);
        this.i_play = cc.find('navmenu/layout/play/icon',this.node);
        this.i_record = cc.find('navmenu/layout/record/icon',this.node);
        this.i_menu = cc.find('navmenu/layout/menu/icon',this.node);

        this.cl_ShareView = ShareView;
        
        this.addevent();
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
            case BUTTON_STATE.ON:return;break;
        }
    } 
    public click_Record(){
        switch(this.getRecordButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }
    public click_Menu(){
        switch(this.getMenuButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }   
   
    public start(){
        
    }
}

