import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";

export class MLeft extends MyAnimation{
    private S_joinRoomState:number;
    private S_opendRoomState:number;

    public constructor(){
       super();
       this.S_joinRoomState = this.S_opendRoomState =  BUTTON_STATE.OFF;
    }

    public getJoinRoomButtonState(){
        return this.S_joinRoomState;
    }

    public getOpendRoomButtonState(){
        return this.S_opendRoomState;
    }
}


export default class Left extends MLeft{
    private node:cc.Node;
    private m_toast:cc.Node;

    private i_joinRoom:cc.Node;
    private i_opendRoom:cc.Node;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);

        this.i_joinRoom = cc.find('left/button_join',this.node);
        this.i_opendRoom = cc.find('left/button_opend',this.node);
        
        this.addEvent();
    }
    public click_JoinRoom(){
        switch(this.getJoinRoomButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    } 
    public click_OpendRoom(){
        switch(this.getOpendRoomButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }    
    private addEvent(){
        this.i_joinRoom.on('touchend',()=>{
            this.click_JoinRoom();
        },this)
        this.i_opendRoom.on('touchend',()=>{
            this.click_OpendRoom();
        },this)
    }
    public start(){
        
    }
    public onDestory(){
        
    }
}

