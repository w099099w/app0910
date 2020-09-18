import Emitter from "../../common/Emitter";
import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import EmitterCode from "../../units/EmitterCode";
import ModelManager from "../model/ModelManager";

enum BUTTON_STATE{
    CLOSE,
    ON
}

export default class VLeft extends MyAnimation{
    private node:cc.Node;
    private m_toast:cc.Node;

    private i_joinRoom:cc.Node;
    private i_opendRoom:cc.Node;
    
    private cl_MModelManager:ModelManager;

    public constructor(Node:cc.Node,ModelManager:ModelManager){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);

        this.i_joinRoom = cc.find('left/button_join',this.node);
        this.i_opendRoom = cc.find('left/button_opend',this.node);
        
        this.cl_MModelManager = ModelManager;
        this.addevent();
    }
    public click_JoinRoom(){
        switch(this.cl_MModelManager.getMode_Home().getDLMButtonState()){
            case BUTTON_STATE.CLOSE:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    } 
    public click_OpendRoom(){
        switch(this.cl_MModelManager.getMode_Home().getJLBButtonState()){
            case BUTTON_STATE.CLOSE:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }    
    private addevent(){
        this.i_joinRoom.on('touchend',()=>{
            Emitter.fire(EmitterCode.CTRL_LEFTCLICKJOINROOM);
        },this)
        this.i_opendRoom.on('touchend',()=>{
            Emitter.fire(EmitterCode.CTRL_LEFTCLICKOPENDROOM);
        },this)
    }
}

