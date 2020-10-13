import MyAnimation from "../common/MyAnimation";
import PlayerInfo from "./PlayerInfo";

export class MPlayer extends MyAnimation {
    private m_cache:PlayerInfo[];
    protected constructor(){
        super(); 
    }
    public WebsocketData(data:any){
        this.updateView();
    }
    protected updateView(){};
}

export default class Player extends MPlayer {
   
    private node:cc.Node;
    
    private m_playerList:cc.Node[];
    private cl_playerInfo; 
    
    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_playerList = cc.find('player',this.node).children;


        this.cl_playerInfo = new PlayerInfo(cc.find('popup'),this);
    }
    public sendAnimation(sendAnimation:SendAnimation){
        
    }
    protected updateView(){

    }
    public onMessage(data){
        //设置数据
        this.WebsocketData(data);
    }
    public start(){

    }
    public onDestroy(){

    }
}
