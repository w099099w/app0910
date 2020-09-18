import Emitter from "../../common/Emitter";
import EmitterCode from "../../units/EmitterCode";
import Tool from "../../units/Tool";

enum BUTTON_STATE{
    OFF,
    ON
}

export default class MLeft{
    private S_joinRoomState:number;
    private S_opendRoomState:number;

    public constructor(){
       this.S_joinRoomState = this.S_opendRoomState =  BUTTON_STATE.OFF;
    }

    public getJoinRoomButtonState(){
        return this.S_joinRoomState;
    }

    public getOpendRoomButtonState(){
        return this.S_opendRoomState;
    }

    /**
     * @description 通知视图层显示粒子动画
     */
    public start(){
        Emitter.fire(EmitterCode.MODE_HOMESTARTPARTICLE,0,Tool.getInstance().genNonDuplicateID());
        Emitter.fire(EmitterCode.MODE_HOMESTARTPARTICLE,1,Tool.getInstance().genNonDuplicateID());
    }
    public click_JoinRoom(){
        if(this.S_joinRoomState){

        }
        Emitter.fire(EmitterCode.MODE_LEFTCLICKJOINROOM);
    }
    public click_OpendRoom(){
        if(this.S_opendRoomState){

        }
        Emitter.fire(EmitterCode.MODE_LEFTCLICKOPENDROOM);
    }
}
