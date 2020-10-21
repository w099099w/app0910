import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import RecordView from "../hall/popup/RecordView";
import SetView from "../common/SetView";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";
import HttpRequest from "../units/HttpRequest";


export class MTOP extends MyAnimation{
    private S_hallAddGold:BUTTON_STATE;
    private S_set:BUTTON_STATE;
    private S_back:BUTTON_STATE;
    private S_record:BUTTON_STATE;

    public constructor(){
       super();
       this.reqBalance();
       this.S_hallAddGold = this.S_set = this.S_back  = this.S_record = BUTTON_STATE.ON;
       //BUTTON_STATE.OFF;
    }
    protected reqBalance(){
        HttpRequest.Req('get','/foo/balance',{},null,(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                UserConfig.getInstance().setBalance(Success.data);
                this.UpdateUserInfo();
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });
    }
    protected getUserInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    protected getBalance():Balance{
        return UserConfig.getInstance().balance;
    }
    protected getSetButtonState(){
        return this.S_set;
    }
    protected getRecordButtonState(){
        return this.S_record;
    }
    protected getBackButtonState(){
        return this.S_back;
    }
    protected getHallAddGoldButtonState(){
        return this.S_hallAddGold;
    }
    public UpdateUserInfo(){};
    protected ToastShow(str:string){};
}


export default class TopView extends MTOP{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;

    private m_nickName:cc.Label;
    private m_Id:cc.Label;
    private m_gold:cc.Label;
    private m_avatar:cc.Node;

    private i_addGold:cc.Node;
    private i_set:cc.Node;
    private i_record:cc.Node;
    private i_back:cc.Node;

    private cl_RecordView:RecordView;
    private cl_SetView:SetView;

    public constructor(Node:cc.Node,RecordView:RecordView,SetView:SetView){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_nickName = cc.find('top/left/userinfo/userinfo/name',this.node).getComponent(cc.Label);
        this.m_Id = cc.find('top/left/userinfo/userinfo/id',this.node).getComponent(cc.Label);
        this.m_gold = cc.find('top/left/gold/value',this.node).getComponent(cc.Label);
        this.m_avatar = cc.find('top/left/userinfo/avatar/mask/avatar',this.node);
    
        
        this.i_addGold = cc.find('top/left/gold/add',this.node);
        this.i_set = cc.find('top/right/button_set',this.node);
        this.i_record = cc.find('top/right/button_record',this.node);
        this.i_back = cc.find('top/right/button_back',this.node);

       
        this.cl_RecordView = RecordView;
        this.cl_SetView = SetView;
        this.UpdateUserInfo();
        this.addEvent();
    }
    public click_AddGold(){
        switch(this.getHallAddGoldButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:Toast.getInstance().show('请联系上级充值!',this.m_toast);break;
        }
    } 
    public click_Record(){
        switch(this.getRecordButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.cl_RecordView.show();break;
        }
    } 
    public click_Set(){
        switch(this.getSetButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.cl_SetView.show();break;
        }
    } 
    public click_BackToHall(){
        switch(this.getBackButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:SceneManager.getInstance().loadScene('hall');break;
        }
    } 
    public UpdateUserInfo(){
        let UserInfo:UserInfo = this.getUserInfo();
        this.m_nickName.string = '昵称:'+UserInfo.nickname;
        this.m_Id.string = 'ID: '+UserInfo.member_id;
        this.m_gold.string = String(this.getBalance().rmb);
        this.UpdateAvatar(UserInfo.avatar);
    }
    public UpdateAvatar(Url:string){
        Tool.getInstance().LoadImageRemote(this.m_avatar,Url,new cc.Vec2(60,60));
    }

   
    public HideEvent(){
        this.i_addGold.off('touchend');
        this.i_record.off('touchend');
        this.i_set.off('touchend');
        this.i_back.off('touchend');
    }
    public addEvent(){
        this.i_addGold.on('touchend',this.click_AddGold.bind(this));
        this.i_record.on('touchend',this.click_Record.bind(this));
        this.i_set.on('touchend',this.click_Set.bind(this));
        this.i_back.on('touchend',this.click_BackToHall.bind(this));
    }

    public ToastShow(str:string){
        Toast.getInstance().show(str,this.m_toast);
    }

    public start(){
        this.addEvent();
    }
    public onDestory(){
        this.HideEvent();
    }
}