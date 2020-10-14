import MyAnimation from "../common/MyAnimation";
import AudioManager from "../units/AudioManager";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";
import BetManager from "./BetManager";
import CardLib from "./CardLib";
import PlayerInfo from "./PlayerInfo";

export class MPlayer extends MyAnimation {
    private m_cache:PlayerData[];
    private m_playrNum:number;
    protected timer:number;

    protected constructor(){
        super();
        this.m_cache = [];
        let MyInfo = this.getMyInfo();
        this.m_cache.push({charid:0,id:MyInfo.id,bet:0,gold:MyInfo.gold,avatar:MyInfo.avatar,nickname:MyInfo.nickname,gender:0})
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

    private c_state:cc.Label;

    private cl_playerInfo:PlayerInfo;
    private cl_cardLib:CardLib; 
    private cl_betManager:BetManager;
    private m_prefab_anim:AnimPrefab;
    private c_goldBase:cc.Label;
    
    public constructor(Node:cc.Node,AnimPrefab:AnimPrefab){
        super();
        this.node = Node;
        this.m_playerList = cc.find('player',this.node).children;

        this.cl_cardLib = cc.find('state/cardLib',this.node).getComponent(CardLib);
        this.cl_playerInfo = new PlayerInfo(cc.find('popup',this.node),this);

        this.m_prefab_anim = AnimPrefab;

        //临时
        this.c_state = cc.find('state/gamestate/value',this.node).getComponent(cc.Label);
        this.cl_betManager = cc.find('bet',this.node).getComponent(BetManager);
        this.c_goldBase = cc.find('state/goldbase',this.node).getComponent(cc.Label);
        //*************
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
    }
    protected getBetValue(){
        this.c_goldBase.string = '池底:'+String(this.cl_betManager.betValue);
        this.m_playerList[0].getChildByName('bet').active = true;
        this.m_playerList[0].getChildByName('bet').getChildByName('value').getComponent(cc.Label).string = String(this.cl_betManager.betValue);
        this.m_playerList[0].getChildByName('cardList').active = true;
    }
    protected shuffleCard(){
        this.cl_betManager.hide();
        this.c_state.string = '洗牌中...'
        let SendList:cc.Node[] = [];
        for(let i = 0; i < this.getplayrNum();++i){
            SendList.push(this.m_playerList[i]);
        }
        this.cl_cardLib.shuffleCard(SendList,3);
    }
    protected BetCountDown(time:number){
        this.c_state.string = '下注倒计时 '+ time+' 秒';
        this.timer = setInterval(()=>{
            this.c_state.string = '下注倒计时 '+ time+' 秒';
            if(time === 0){
                clearInterval(this.timer);
                this.timer = null;
                this.shuffleCard();
            }
            time--;
        },1000);
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
    private SendCard(){
        
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
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
