import CountDown from "../common/CountDown";
import MyAnimation from "../common/MyAnimation";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";
import Player from "./Player";

export class MPlayerInfo extends MyAnimation {
    private m_cache:PlayerInfo[];
    protected constructor(){
        super(); 
    }
    protected HttpReauest(SendData:SendAnimation){
        this.sendAnimation(SendData);
    }
    protected getMyInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    //重写
    protected sendAnimation(SendData:SendAnimation){};
}
export default class PlayerInfo extends MPlayerInfo {
    private node:cc.Node;
    private m_receiver:PlayerData;
    private m_animList:cc.Node[];
    private m_layoutInfo:cc.Node;
    private m_layoutAnim:cc.Node;
    private m_root:cc.Node;
    private m_mask:cc.Node;
    
    private i_close:cc.Node;
    
    private c_nickname:cc.Label;
    private c_avatar:cc.Node;
    private c_id:cc.Label;
    private c_balance:cc.Label;

    private cl_Player:Player;

    public constructor(Node:cc.Node,Player:Player){
        super();
        this.node = Node;
        this.m_animList = cc.find('playerinfo/layout/animation',this.node).children;
        this.m_layoutInfo = cc.find('playerinfo/layout/info',this.node);
        this.m_layoutAnim = cc.find('playerinfo/layout/animation',this.node);
        this.m_root = cc.find('playerinfo',this.node);
        this.m_mask = cc.find('mask',this.node);

        this.i_close = cc.find('playerinfo/button_close',this.node);

        this.c_nickname = cc.find('playerinfo/layout/info/nickname',this.node).getComponent(cc.Label);
        this.c_avatar = cc.find('playerinfo/layout/info/avatar/mask/avatar',this.node);
        this.c_id = cc.find('playerinfo/layout/info/id',this.node).getComponent(cc.Label);
        this.c_balance = cc.find('playerinfo/layout/info/balance',this.node).getComponent(cc.Label);
        this.m_root.active = false;
        this.cl_Player = Player;
    }
    public show(PlayerInfo:PlayerData){
        if(!PlayerInfo){
            return;
        }
        this.m_receiver = PlayerInfo;
        this.m_layoutInfo.active = true;
        this.m_layoutAnim.active = this.m_receiver.id === this.getMyInfo().id?false:true;
        this.c_balance.string = '余额: '+String(this.m_receiver.gold);
        this.c_id.string = '玩家ID: '+String(this.m_receiver.id);
        this.c_nickname.string = '昵称: '+String(this.m_receiver.nickname);
        Tool.getInstance().LoadImageRemote(this.c_avatar,this.m_receiver.avatar,new cc.Vec2(128,128));
        this.node.active = true;
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
        this.m_animList.forEach((item)=>{
            let cl_countDown:CountDown = item.getChildByName('mask').getComponent(CountDown);
            cl_countDown.activeOn();
        })
    }
    private hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
        this.m_animList.forEach((item)=>{
            let cl_countDown:CountDown = item.getChildByName('mask').getComponent(CountDown);
            cl_countDown.activeOff();
        })
        this.m_receiver = null;
    }
    private addEvent(){
        this.i_close.on('touchend',this.hide.bind(this));
        this.m_animList.forEach((item,key)=>{
            item.getChildByName('icon').on('touchend',()=>{
                if(item.getChildByName('mask').getComponent(CountDown).countDownFinish){
                    this.cl_Player.sendAnimation({sendid:String(this.getMyInfo().id),receive:this.m_receiver.id,animationid:key})
                    this.allAnimHide(10000);
                    this.hide();
                }
            });
        },this);
    }
    private allAnimHide(time:number){
        this.m_animList.forEach((item)=>{
            let cl_countDown:CountDown = item.getChildByName('mask').getComponent(CountDown);
            cl_countDown.show(time);
        })
    }
    private hideEvent(){
        this.i_close.off('touchend');
        this.m_animList.forEach((item)=>{
            item.getChildByName('icon').off('touchend');
        },this);
    }
    protected sendAnimation(SendData:SendAnimation){
        this.cl_Player.sendAnimation(SendData);
    };
}
