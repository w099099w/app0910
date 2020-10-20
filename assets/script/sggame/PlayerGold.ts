import AtlasLib from "../common/AtlasLib";
import GoldChange from "../common/GoldChange";
import MyAnimation from "../common/MyAnimation";
import NodePool from "../common/NodePool";
import SceneManager from "../common/SceneManager";
import Left from "../hall/base/Left";
import AudioManager from "../units/AudioManager";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";


export default class PlayerGold extends MyAnimation{
    private m_betBase:cc.Node;
    private m_betBaseChild:cc.Node[];
    private m_allCount:number;
    private minBet:number;
    private maxBet:number;
    private getCreateNum(Val:number){
        if(Val-this.minBet === 0){
            return 1;
        }
        return Math.ceil(10*((Val-this.minBet)/(this.maxBet-this.minBet)));
    }
    private getBackNum(SendLength:number,isMax:boolean){
        let addNum:number = this.m_allCount - Math.floor(this.m_allCount/SendLength)*SendLength;
        
        return isMax?Math.floor(this.m_allCount/SendLength)+addNum:Math.floor(this.m_allCount/SendLength);
    }
    public constructor(BetBase:cc.Node,minBet:number,maxBet:number){
        super();
        this.minBet = minBet;
        this.maxBet = maxBet;
        this.m_betBase = BetBase;
        this.m_betBaseChild = [];
    }
    public setAllCount(){
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg' && cc.isValid(this.m_betBase)){
                this.m_allCount = this.m_betBase.children.length;
                this.m_betBaseChild = [];
                for(let i = 0; i < this.m_allCount;++i){
                    this.m_betBaseChild[i] = this.m_betBase.children[i];
                }
            }
        },1500) 
    }
    /**
     * @description 设置玩家的输赢金币
     * @param Node 设置的玩家主节点
     * @param Num 设置的数值
     */
    public showAddGold(Node:cc.Node,Num:number){
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg' && cc.isValid(Node)){
                let Gold:GoldChange =  Node.getChildByName('addgold').getComponent(GoldChange);
                Gold.string = Num;
            }
        },1000)
    }
    
    public getPos(Startpos:cc.Vec2,r:number,angle:number){
        let radian:number = angle * Math.PI / 180;
        return new cc.Vec2(Startpos.x+r*Math.cos(radian),Startpos.y+r*Math.sin(radian));
    }
    /**
     * @description 设置玩家的下注金币并播放动画
     * @param Node 设置的玩家主节点
     * @param Num 设置的数值
     */
    public playBetAnim(Node:cc.Node,Num:number){
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                AudioManager.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_GOLD_ADD,false);
            }
        },800);
        Node.getChildByName('bet').getChildByName('value').getComponent(cc.Label).string = String(Num);
        let parent:cc.Node = Node.getChildByName('gold');
        let CreatNum:number = this.getCreateNum(Num);
        console.log('add',Node,CreatNum);
        let xMove = Tool.getInstance().randomAccess(-100,100);
        for(let i = 0; i < CreatNum;++i){
            let TempNode:cc.Node = NodePool.getInstance().getNodeFromPool('SgGold');
            TempNode.active = true;
            TempNode.parent = parent;
            TempNode.position = new cc.Vec3(0,0,0);
            let onePos:cc.Vec2 = this.getPos(new cc.Vec2(0,0),Tool.getInstance().randomAccess(-40,40),Tool.getInstance().randomAccess(0,360));
            let TargetPos:cc.Vec3 = this.m_betBase.parent.convertToWorldSpaceAR(this.m_betBase.position);
            let TargetPosToMyPos:cc.Vec3 = parent.convertToNodeSpaceAR(TargetPos);
            TargetPosToMyPos.x += onePos.x+xMove;
            TargetPosToMyPos.y += onePos.y;
            this.RunBetAnim(TempNode,onePos,new cc.Vec2(TargetPosToMyPos.x,TargetPosToMyPos.y),()=>{
                let Tpos:cc.Vec3 = TempNode.parent.convertToWorldSpaceAR(TargetPosToMyPos);
                let FinishPos:cc.Vec3 = this.m_betBase.convertToNodeSpaceAR(Tpos);
                TempNode.parent = this.m_betBase;
                TempNode.position = FinishPos;
            });
        }
    }
    /**
     * @description 设置玩家的下注金币并播放动画
     * @param Node 设置的玩家主节点
     * @param Num 设置的数值
     */
    public playBetAnimBack(Node:cc.Node,SendNumber:number,isMax:boolean){
        let parent:cc.Node = Node.getChildByName('avatar').getChildByName('gold');
        let CreatNum:number = this.getBackNum(SendNumber,isMax);
        console.log(this.m_betBaseChild.length);
        console.log('bofang',Node,CreatNum);
        for(let i = 0; i < CreatNum;++i){
            let TempNode:cc.Node = this.m_betBaseChild.shift();
            let onePos:cc.Vec2 = this.getPos(new cc.Vec2(0,0),Tool.getInstance().randomAccess(-20,20),Tool.getInstance().randomAccess(0,360));
            let TargetPos:cc.Vec3 = parent.parent.convertToWorldSpaceAR(parent.position);
            let TargetPosToMyPos:cc.Vec3 = this.m_betBase.convertToNodeSpaceAR(TargetPos);
            TargetPosToMyPos.x += onePos.x;
            TargetPosToMyPos.y += onePos.y;
            this.RunBetAnim(TempNode,onePos,new cc.Vec2(TargetPosToMyPos.x,TargetPosToMyPos.y),()=>{
               setTimeout(()=>{
                 if(cc.isValid(TempNode)){
                     TempNode.destroy();
                 }
               },1000)
            });
        }
    }
}
