import AtlasLib from "../common/AtlasLib";
import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import AudioManager from "../units/AudioManager";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";
import BetManager from "./BetManager";
import CardLib from "./CardLib";
import OpenCard from "./OpenCard";
import PlayerGold from "./PlayerGold";
import PlayerInfo from "./PlayerInfo";

export class MPlayer extends MyAnimation {
    private m_cache:PlayerData[];
    private m_playrNum:number;
    protected timer:number;

    protected constructor(){
        super();
        this.m_cache = [];
        let MyInfo = this.getMyInfo();
        this.m_cache.push({charid:0,id:String(MyInfo.member_id),bet:0,gold:this.getBalance().rmb,avatar:MyInfo.avatar,nickname:MyInfo.nickname,gender:0})
        this.m_playrNum  = Tool.getInstance().randomAccess(4,10);
        this.timer = setInterval(()=>{
            if(this.m_cache.length != this.m_playrNum){
                this.m_cache.push({charid:this.m_cache.length,id:Tool.getInstance().randomNumber(5),bet:0,gold:Tool.getInstance().randomAccess(4000,200000),avatar:MyInfo.avatar,nickname:Tool.getInstance().getRandomName(3),gender:0})
                this.updateView();
            }else{
                clearInterval(this.timer);
                this.Startbet();
            }
        },2000);
    }
    protected getBalance():Balance{
        return UserConfig.getInstance().balance;
    }
    protected getMyInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    public WebsocketData(data:any){
        this.updateView();
    }
    public getUserInfoFromIndex(index:number):PlayerData{
        if(this.m_cache && this.m_cache[index]){
            return this.m_cache[index];
        }else{
            return null;
        }
    }
    protected getSetDownIsFinish():boolean{
        return this.m_cache.length === this.m_playrNum;
    }
    protected getplayrNum():number{
        return this.m_cache.length;
    }
    public getUsesIndexFromUserID(UserID:string):number{
        if(this.m_cache){
            for(let i = 0; i < this.m_cache.length;++i){
                if(this.m_cache[i].id === UserID){
                    return i;
                }
            }
        }
        return null;
    }
    protected Startbet(){};
    protected updateView(){};

    //临时
    protected getTableInfo():SanGongRuleInfo{
        return UserConfig.getInstance().getTableInfo();
    }
}

export default class Player extends MPlayer {
   
    private node:cc.Node;
    private m_playerList:cc.Node[];
    private m_buttonCode:CTRLBUTTON;
    private c_state:cc.Label;

    private cl_playerInfo:PlayerInfo;
    private cl_cardLib:CardLib; 
    private cl_betManager:BetManager;
    private cl_playerGold:PlayerGold;
    private cl_openCard:OpenCard;
    private m_BuRoot:cc.Node;
    private i_openCardBu:cc.Node;
    private i_peekCardBu:cc.Node;
    private m_prefab_anim:AnimPrefab;
    private c_goldBase:cc.Label;
    private cardArr:number[];
    
    public constructor(Node:cc.Node,AnimPrefab:AnimPrefab){
        super();
        this.node = Node;
        this.m_playerList = cc.find('player',this.node).children;

        this.m_BuRoot = cc.find('ctrlbutton',this.node);
        this.i_openCardBu = cc.find('ctrlbutton/opencard',this.node);
        this.i_peekCardBu = cc.find('ctrlbutton/peekcard',this.node);

        this.cl_cardLib = cc.find('state/cardLib',this.node).getComponent(CardLib);
        this.cl_playerInfo = new PlayerInfo(cc.find('popup',this.node),this);
        this.cl_playerGold = new PlayerGold(cc.find('state/goldtarget',this.node),this.getTableInfo().min,this.getTableInfo().max);
        this.cl_openCard = new OpenCard(this.node);
        this.m_prefab_anim = AnimPrefab;

        //临时
        this.c_state = cc.find('state/gamestate/value',this.node).getComponent(cc.Label);
        this.cl_betManager = cc.find('bet',this.node).getComponent(BetManager);
        this.c_goldBase = cc.find('state/goldbase',this.node).getComponent(cc.Label);
        //*************
        this.m_BuRoot.active = false;
        this.cl_betManager.hide();

        this.resetView();
        this.updateView();
        this.addEvent();
    }
    public sendAnimation(sendAnimation:SendAnimation){
        let prefab:cc.Prefab;
        switch(sendAnimation.animationid){
            case 0:prefab = this.m_prefab_anim.hand;break;
            case 1:prefab = this.m_prefab_anim.tomato;break;
            case 2:prefab = this.m_prefab_anim.flower;break;
            case 3:prefab = this.m_prefab_anim.boom;break;
            case 4:prefab = this.m_prefab_anim.water;break;
        }
        let TempNode = cc.instantiate(prefab);
        TempNode.parent = this.m_playerList[0].parent;
        let RecPos:cc.Vec3 = this.getPosFromUserid(this.getUsesIndexFromUserID(sendAnimation.receive));
        let SendPos:cc.Vec3 = this.getPosFromUserid(this.getUsesIndexFromUserID(sendAnimation.sendid));
        this.RunAnimtation(TempNode,SendPos,RecPos);
    }
    private getPosFromUserid(index:number):cc.Vec3{
        let parent = this.m_playerList[index].parent;
        let avatar = this.m_playerList[index].getChildByName('avatar');
        let wordPos = avatar.parent.convertToWorldSpaceAR(avatar.position);
        let targetPos = parent.convertToNodeSpaceAR(wordPos);
        return targetPos;
    }
    private resetView(){
        this.c_goldBase.string = '池底:'+0;
        this.c_state.string = '等待玩家中...';
        this.m_playerList.forEach((item,key)=>{
            if(item.name.substr(0,6) === 'player'){
                let nickname:cc.Label = cc.find('avatar/name',item).getComponent(cc.Label);
                let gold:cc.Label = cc.find('avatar/gold',item).getComponent(cc.Label);
                let bet:cc.Label = cc.find('bet/value',item).getComponent(cc.Label);
                let avatar:cc.Node = cc.find('avatar/avatar/image',item);
                let cardList:cc.Node = cc.find('cardList',item);
                let type:cc.Node = cc.find('type',item);
                let addgold:cc.Node = cc.find('addgold',item);
                nickname.string = '';
                avatar.getComponent(cc.Sprite).spriteFrame = null;
                gold.string = String(0);
                bet.string = String(0);
                cardList.removeAllChildren();
                cardList.active = true;
                type.active = false;
                addgold.active = false;
                bet.node.parent.active = true;
            }
        })
    }
    protected Startbet(){
        AudioManager.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_NEWGAME,false);
        this.BetCountDown(20);
        this.m_playerList[0].getChildByName('bet').active = false;
        this.m_playerList[0].getChildByName('cardList').active = false;
        this.cl_betManager.show(this.getTableInfo().min,this.getTableInfo().max,this.getTableInfo().min+Math.floor((this.getTableInfo().max-this.getTableInfo().min)/2),this.getBetValue.bind(this));
        // this.cl_playerGold.playBetAnim(this.m_playerList[0],this.getTableInfo().min+1000);
        //test代码
        let t = [];
        let u = [];
        let s = [];
        let am = [];
        let lose = [];
        u.push(0);
        for(let i = 1; i < this.getplayrNum();++i){
            t.push(i);
            u.push(i);
        }
        for(let i = 1; i < this.getplayrNum();++i){
            setTimeout(()=>{
                if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                    let index = Tool.getInstance().randomAccess(0,t.length-1);
                    this.cl_playerGold.playBetAnim(this.m_playerList[t[index]],Tool.getInstance().randomAccess(this.getTableInfo().min,this.getTableInfo().max));
                    t.splice(index,1);
                }
                setTimeout(()=>{
                    if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                        this.calcGoldBase();
                    }
                },300);
            },18000*Math.random());
        }
        let ak = Tool.getInstance().randomAccess(1,this.getplayrNum()-1);
        for(let i = 0; i < ak;++i){
            let index = Tool.getInstance().randomAccess(0,u.length-1);
            s.push(u[index]);
            u.splice(index,1);
        }
        am = u;
        console.log('win',s);
        console.log('lose',am);
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                AudioManager.getInstance().playEffectFromLocal(EFF_CODE.EFF_SG_GOLD_SUB,false);
                for(let i = 0; i < s.length;++i){
                    this.cl_playerGold.playBetAnimBack(this.m_playerList[s[i]],s.length,i===0?true:false);
                    this.cl_playerGold.showAddGold(this.m_playerList[s[i]],Tool.getInstance().randomAccess(500,10000));
                }
                for(let i = 0; i < am.length;++i){
                    this.cl_playerGold.showAddGold(this.m_playerList[am[i]],Tool.getInstance().randomAccess(-10000,500));
                }
            }
            setTimeout(()=>{
                if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                    this.c_goldBase.string = '池底:'+0;
                }
            },300);
        },35000);
    }
    protected calcGoldBase(){
        let base:number = 0;
        this.m_playerList.forEach((item,key)=>{
            if(item.name.substr(0,6) === 'player' && item.active){
                let PlayerData:PlayerData = this.getUserInfoFromIndex(key);
                let bet:cc.Label = cc.find('bet/value',item).getComponent(cc.Label);
                base+=Number(bet.string);
                this.c_goldBase.string = '池底:'+base;
            }
        })
    }
    protected getBetValue(){
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                this.calcGoldBase();
            }
        },300);
        this.m_playerList[0].getChildByName('bet').active = true;
        this.m_playerList[0].getChildByName('bet').getChildByName('value').getComponent(cc.Label).string = String(this.cl_betManager.betValue);
        this.m_playerList[0].getChildByName('cardList').active = true;
        this.cl_playerGold.playBetAnim(this.m_playerList[0],this.cl_betManager.betValue);
        this.cl_playerGold.setAllCount();
    }
    protected shuffleCard(){
        this.cardArr = [];
        let n = [];
        for(let i = 0;i<54;++i){
            n.push(i);
        }
        for(let i = 0;i<3;++i){
           let index = Tool.getInstance().randomAccess(0,n.length-1);
           this.cardArr.push(n[index]);
           n.splice(index,1);
        }
       
        this.cl_playerGold.setAllCount();
        this.cl_betManager.hide();
        this.c_state.string = '洗牌中...'
        let SendList:cc.Node[] = [];
        for(let i = 0; i < this.getplayrNum();++i){
            SendList.push(this.m_playerList[i]);
        }
        this.cl_cardLib.shuffleCard(SendList,3);
    }
    protected BetCountDown(time:number,value:string = '下注倒计时 '){
        this.c_state.string = value+ time+' 秒';
        this.timer = setInterval(()=>{
            this.c_state.string = value+ time+' 秒';
            if(time === 0){
                clearInterval(this.timer);
                this.timer = null;
                if(value==='下注倒计时 '){
                    this.BetCountDown(13,'金币回收倒计时 ')
                    this.shuffleCard();
                }else if(value === '金币回收倒计时 '){
                    this.BetCountDown(7,'开牌按钮激活剩余时间 ')
                }else if(value === '开牌按钮激活剩余时间 '){
                    this.showButton(CTRLBUTTON.OPENCARD);
                }
            }
            time--;
        },1000);
    }
    public openCardFinish(val:number|number[]){
        if(Array.isArray(val)){
            console.log(this.m_playerList[0].getChildByName('cardList').children)
            for(let i = 0;i <val.length;++i){
                setTimeout(()=>{
                    if(SceneManager.getInstance().getSceneName() === 'game_sg'){
                        let item:cc.Node = this.m_playerList[0].getChildByName('cardList').children[i];
                        let swSp:SwitchSp = item.getComponent('switchsp');
                        swSp.updateFrame(1,AtlasLib.getInstance().getSpriteFrame('card','x'+val[i]))
                        this.RunOpenCard(item);
                    }
                },270+i*0.5*1000);
            }
        }else{
            this.cl_openCard.hide();
            let item:cc.Node = this.m_playerList[0].getChildByName('cardList').children[2];
            let swSp:SwitchSp = item.getComponent('switchsp');
            swSp.updateFrame(1,AtlasLib.getInstance().getSpriteFrame('card','x'+val));
            this.RunOpenCard(this.m_playerList[0].getChildByName('cardList').children[2]);
        }
    }
    private hideButton(){
        this.i_openCardBu.off('touchend');
        this.i_peekCardBu.off('touchend');
        this.popupCloseScaleXY(this.m_BuRoot,null);
    }
    private showButton(ButtonCode:CTRLBUTTON){
        console.log(ButtonCode)
        this.m_buttonCode = ButtonCode;
        if(ButtonCode === CTRLBUTTON.NONE){
            console.log('finish')
            this.hideButton();
            return;
        } 
        this.i_openCardBu.on('touchend',this.openCard.bind(this));
        this.i_openCardBu.getComponent(cc.Button).interactable = true;
        this.i_openCardBu.getComponent('switchsp').setSpriteFrame(CTRLBUTTON.OPENCARD);
        switch(this.m_buttonCode){
            case CTRLBUTTON.OPENCARD:{
                this.i_peekCardBu.on('touchend',this.peekCard.bind(this));
                this.i_openCardBu.getComponent(cc.Button).interactable = true;
            }break;
            default:this.i_openCardBu.getComponent(cc.Button).interactable = false;
        }
        this.popupOpenScaleXY(this.m_BuRoot,null);
    }
    protected updateView(){
        this.m_playerList.forEach((item,key)=>{
            if(item.name.substr(0,6) === 'player'){
                let PlayerData:PlayerData = this.getUserInfoFromIndex(key);
                if(PlayerData){
                    let nickname:cc.Label = cc.find('avatar/name',item).getComponent(cc.Label);
                    let gold:cc.Label = cc.find('avatar/gold',item).getComponent(cc.Label);
                    let bet:cc.Label = cc.find('bet/value',item).getComponent(cc.Label);
                    let avatar:cc.Node = cc.find('avatar/avatar/image',item);
                    nickname.string = PlayerData.nickname;
                    gold.string = Tool.getInstance().forMat(PlayerData.gold,10000);
                    bet.string = String(PlayerData.bet);
                    Tool.getInstance().LoadImageRemote(avatar,PlayerData.avatar,new cc.Vec2(65,65));
                    item.active = true;
                }else{
                    item.active = false;
                }
            }
        })
    }
    private openCard(){
        console.log('开牌');
        this.showButton(CTRLBUTTON.NONE);
        this.openCardFinish(this.cardArr);
    }
    private peekCard(){
        console.log('搓牌');
        this.showButton(CTRLBUTTON.NONE);
        this.openCardFinish([this.cardArr[0],this.cardArr[1]]);
        this.cl_openCard.show(this.cardArr,()=>{
            this.openCardFinish(this.cardArr[2]);
        });
    }
    private addEvent(){
        this.m_playerList.forEach((item,key) => {
            item.getChildByName('avatar').on('touchend',()=>{
                this.cl_playerInfo.show(this.getUserInfoFromIndex(key));
            },this);
        });
    }
    public onMessage(data){
        //设置数据
        this.WebsocketData(data);
    }
    public start(){

    }
    public onDestroy(){
        
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i); 
        }

        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
