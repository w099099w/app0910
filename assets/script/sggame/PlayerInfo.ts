import MyAnimation from "../common/MyAnimation";
import Player from "./Player";

export class MPlayerInfo extends MyAnimation {
    private m_cache:PlayerInfo[];
    protected constructor(){
        super(); 
    }
    protected HttpReauest(SendData:SendAnimation){
        this.sendAnimation(SendData);
    }
    //重写
    protected sendAnimation(SendData:SendAnimation){};
}
export default class PlayerInfo extends MPlayerInfo {
    private node:cc.Node;
    private cl_Player:Player;
    public constructor(Node:cc.Node,Player:Player){
        super();
        this.node = this.node;
        this.cl_Player = Player;
    }
    private clickAnimation(key:number){

    }
    protected sendAnimation(SendData:SendAnimation){
        this.cl_Player.sendAnimation(SendData);
    };
}
