import AtlasLib from "../common/AtlasLib";
import MyAnimation from "../common/MyAnimation";
import NodePool from "../common/NodePool";
import Left from "../hall/base/Left";
import AudioManager from "../units/AudioManager";
import UserConfig from "../units/UserConfig";

const {ccclass, menu,property} = cc._decorator;

@ccclass
@menu('三公/牌库')
export default class CardLib extends cc.Component {
    @property(cc.Prefab)
    cardPrefab:cc.Prefab = null;
    private Tween:cc.Tween[];
    private children:cc.Node[];
    onLoad(){
        this.Tween = [];
        this.children = [];
        NodePool.getInstance().createrNodePool('card',this.cardPrefab,54);
    }
    public setCardBase(key:number,spriteFrame:cc.SpriteFrame){
        if(!this.children){
            return;
        }
        for(let i = 0; i < this.children.length;++i){
            let width:number = this.children[i].width;
            let height:number = this.children[i].height;
            this.children[i].getComponent('switchsp').updateFrame(key,spriteFrame);
            this.children[i].width = width;
            this.children[i].height = height;
        }
    }
    shuffleCard(SendList:cc.Node[],SendNum:number,callBack:Function = null){
        let CardBaseID:number = UserConfig.getInstance().getSgSetViewConfig().cardid;
        let CardNum = SendList.length*SendNum;
        for(let k in this.Tween){
            if(this.Tween[k]){
                this.Tween[k].stop();
                this.Tween[k] = null;
            }
        }
        for(let i = 0; i < this.node.children.length;++i){
            NodePool.getInstance().destroyNode('card',this.node.children[i]);
            this.children[i] = null;
        }
        for(let i = 0;i < CardNum;++i){
            let CardNode:cc.Node = NodePool.getInstance().getNodeFromPool('card');
            this.children[i] = CardNode;
            this.node.addChild(CardNode);
            CardNode.getComponent('switchsp').updateFrame(0,AtlasLib.getInstance().getSpriteFrame('card','base'+CardBaseID));
            CardNode.width = 83;
            CardNode.height = 111;
        }
        let TargetPos:cc.Vec3 = new cc.Vec3(0,0,0);
        let LeftPos:cc.Vec3 = new cc.Vec3(-80,0,0);
        let RightPos:cc.Vec3 = new cc.Vec3(80,0,0);

        let RunNum = this.node.children.length;
        this.node.children.forEach((item,key)=>{
            if(key > Math.floor(CardNum/2)){
                this.Tween[key] = cc.tween(item).delay(0.2*key).to(0.3,{position:LeftPos}).to(0.3,{position:RightPos}).to(0.3,{position:TargetPos}).call(()=>{
                    this.Tween[key] = null;
                    RunNum--;
                    if(RunNum == 0){
                        this.SendCardToPlayer(SendList,SendNum,callBack);
                    }
                }).start();
            }else{
                this.Tween[key] = cc.tween(item).delay(0.2*key).to(0.3,{position:RightPos}).to(0.3,{position:LeftPos}).to(0.3,{position:TargetPos}).call(()=>{
                    this.Tween[key] = null;
                    RunNum--
                    if(RunNum == 0){
                        this.SendCardToPlayer(SendList,SendNum,callBack);
                    }
                }).start();
            }    
        },this);
    }
    private SendCardToPlayer(SendList:cc.Node[],SendNum:number,callBack:Function){
        let FinishNum:number = SendList.length*SendNum;
        for(let i = 0; i < SendList.length;++i){
            let item:cc.Node = SendList[i];
            let WorldPos:cc.Vec3 = item.convertToWorldSpaceAR(item.getChildByName('cardList').position);
            let TargetPos:cc.Vec3 = this.node.convertToNodeSpaceAR(WorldPos);
            let Scale:cc.Vec2;
            if(item.name === 'player1'){
                Scale = new cc.Vec2(83,111);
            }else{
                Scale = new cc.Vec2(57,76);
            }
            for(let k = 0;k<SendNum;++k){
                let citem:cc.Node = this.children[i*SendNum+k];
                if(citem){
                    this.Tween[k] = cc.tween(citem).delay(0.5+i*0.5+k*0.1).call(()=>{
                        AudioManager.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_SENDCARD,false);
                    }).to(0.1,{position:new cc.Vec3(TargetPos.x+k*27,TargetPos.y,TargetPos.z),width:Scale.x,height:Scale.y}).call(()=>{
                        this.Tween[k] = null;
                        FinishNum--;
                        if(FinishNum === 0 && callBack){
                            callBack();
                        }
                        citem.y = 0;
                        citem.parent = item.getChildByName('cardList');
                    }).start();
                }else{
                    cc.error('节点错误',citem,i*SendNum+k)
                }
              
            }
        }
    }
    public StopShuffleCard(){
        for(let k in this.Tween){
            if(this.Tween[k]){
                this.Tween[k].stop();
                this.Tween[k] = null;
            }
        }
        for(let i = 0; i < this.node.children.length;++i){
            NodePool.getInstance().destroyNode('card',this.node.children[i]);
            this.children[i] = null;
        }
    }
    onDestroy(){
        
    }
}
