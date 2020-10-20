// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AtlasLib from "../common/AtlasLib";
import MyAnimation from "../common/MyAnimation";
import PeekCard from "../common/PeekCard";
import SceneManager from "../common/SceneManager";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";

export default class OpenCard extends MyAnimation {
    private node:cc.Node;
    private m_root:cc.Node;
    private m_mask:cc.Node;
    private m_peekNode:cc.Node;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_root = cc.find('popup/opencard',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root.active = false;
    }
    public setCardBase(sp:cc.SpriteFrame){
        if(cc.isValid(this.m_peekNode,true)){
            this.m_peekNode.getComponent(PeekCard).setCardBack(sp);
        }
    }
    public show(data:number[],callBack:Function){
        for(let i = 0 ;i < 2;++i){
            setTimeout(()=>{
                if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                    let swSp:SwitchSp = this.m_root.children[i].getComponent('switchsp');
                    swSp.setSpriteFrame(0);
                    swSp.updateFrame(1,AtlasLib.getInstance().getSpriteFrame('card','x'+data[i]));
                    this.RunOpenCard(this.m_root.children[i]);
                } 
            },250+i*0.5*1000);
        }
        this.buildPeekCard(PeekCard.DirType.horizontal,'peekcard/base'+UserConfig.getInstance().getSgSetViewConfig().cardid,'peekcard/x'+data[2],callBack);
        this.popupOpenScaleXY(this.m_root,this.m_mask);
    }
    public async buildPeekCard(dirType: PeekCard["dirType"],cardBase:string,cardFace:string,callBack:Function = null) {
        console.log(cardBase,cardFace)
        console.log("动态创建搓牌节点 ", PeekCard.DirType[dirType]);
        this.m_peekNode = new cc.Node("PeekCard");
        let peekCard:PeekCard = this.m_peekNode.addComponent(PeekCard);
        peekCard.onLoad();
        this.m_root.addChild(this.m_peekNode);
        this.m_peekNode.position = new cc.Vec3(37,0,0);
        // 动态创建时一定要第一时间设置好原始方向
        peekCard._originalDir = peekCard._dirType = PeekCard.DirType.vertical;
        // 设置搓牌区域大小 默认是Canvas设计分辨率大小
        peekCard.setTouchAreaSize(cc.size(253, 370))
        // 优先设置牌大小
        peekCard.setCardSize(cc.size(253, 370));

        // 动态设置搓牌方向(允许在其他位置调用)
        peekCard.dirType = dirType;
        peekCard.setFinishCallBack(callBack);
        await peekCard.setCardBack(cardBase);
        await peekCard.setCardFace(cardFace);
        await peekCard.setShadow("shadow");
        await peekCard.setFinger(null);

        peekCard.directionLength = 20;
        peekCard.moveSpeed = 0.6;
        peekCard.angleFixed = 5;

        peekCard.init();    //搓牌前必须调用
    }
    public hide(){
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                this.m_root.removeChild(this.m_peekNode);
                this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
            }
        },1500)
    }
    private addEvent(){
       
    }
    private hideEvent(){
    }
}
