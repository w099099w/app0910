import Load from "../../common/Load";
import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import HttpRequest from "../../units/HttpRequest";
import Tool from "../../units/Tool";
import UserConfig from "../../units/UserConfig";
import MoneyFlowView from "../popup/MoneyFlowView";
import RealNameView from "../popup/RealNameView";
import ResetPdView from "../popup/ResetPdView";

export class MUser extends MyAnimation{
    private S_hallAddGold:BUTTON_STATE;
    private S_hallAvatarToUser:BUTTON_STATE;
    private S_changeName:BUTTON_STATE;
    private S_realName:BUTTON_STATE;
    private S_changePD:BUTTON_STATE;
    private S_moneyFlow:BUTTON_STATE;
    private S_updataAvatar:BUTTON_STATE;
    protected changeNameState:string[];

    public constructor(){
       super();
       this.reqBalance();
       this.changeNameState = [
           '昵称长度不正确4-12位!',
           '昵称只能为英文汉字或下滑线',
           '昵称修改成功!',
           '昵称修改失败'
       ]
       this.S_moneyFlow = this.S_realName = this.S_changeName = this.S_changePD = this.S_hallAvatarToUser = this.S_updataAvatar = this.S_hallAddGold = BUTTON_STATE.ON;
       //BUTTON_STATE.OFF;
    }
    protected reqBalance(){
        HttpRequest.Req('get','/foo/balance',{},null,(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                UserConfig.getInstance().setBalance(Success.data);
                this.UpdateBaseInfo();
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });
    }
    public getUserInfoButtonState(){
        return this.S_hallAvatarToUser;
    }
    public getChangeNameButtonState(){
        return this.S_changeName;
    }
    public getHallAddGoldButtonState(){
        return this.S_hallAddGold;
    }

    public getRealNameButtonState(){
        return this.S_realName;
    }
    public getChangePDButtonState(){
        return this.S_changePD;
    }
    public getMoneyFlowButtonState(){
        return this.S_moneyFlow;
    }
    public getAvatarButtonState(){
        return this.S_updataAvatar;
    }
    public getUserInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    public getBalance():Balance{
        return UserConfig.getInstance().balance;
    }
    protected changeName(Name:ChangeInfo){
        if(Name.field_one.length < 4 || Name.field_one.length > 12){
            this.ToastShow(this.changeNameState[CHANGE_NAME_RESULT.NAME_LENGTH_ERROR]);
            this.UpdateUserInfo();
            return;
        }else if(!Tool.getInstance().isNickName(Name.field_one)){
            this.ToastShow(this.changeNameState[CHANGE_NAME_RESULT.NAME_CHECK_ERROR]);
            this.UpdateUserInfo();
            return;
        }else if(Name.field_one === this.getUserInfo().nickname){
            return;
        }
        HttpRequest.Req('put','/foo/modify',Name,Load.getInstance(),(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                UserConfig.getInstance().setUserInfo({nickname:Name.field_one});
                this.UpdateBaseInfo();
                this.ToastShow('昵称修改成功!');
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });
    }
    protected UpdateUserInfo(){};
    protected UpdateBaseInfo(){};
    protected ToastShow(str:string){};
}


export default class UserView extends MUser{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;

    private m_hallNickName:cc.Label;
    private m_hallId:cc.Label;
    private m_hallgold:cc.Label;
    private m_inputName:cc.Node;
    private m_id:cc.Label;
    private m_parentID:cc.Label;
    private m_phone:cc.Label;

    private i_avatarNode:cc.Node;
    private i_hallAddGold:cc.Node;
    private i_hallAvatarSpriteNode:cc.Node;
    private i_realName:cc.Node;
    private i_resetPd:cc.Node;
    private i_moneyflow:cc.Node;
    private i_close:cc.Node;
    private i_editName:cc.Node;

    private cl_ResetPdView:ResetPdView;
    private cl_RealNameView:RealNameView;
    private cl_MoneyFlowView:MoneyFlowView;

    private _changeNameParam:ChangeInfo;
    get changeNameParam():ChangeInfo{
        let data:ChangeInfo = {
            genre:1,
            field_one:this.m_inputName.getComponent(cc.EditBox).string,
            field_two:null,
        }
        return data;
    }

    public constructor(Node:cc.Node,ResetPdView:ResetPdView,RealNameView:RealNameView,MoneyFlowView:MoneyFlowView){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root = cc.find('popup/userinfo',this.node);
        this.m_hallNickName = cc.find('top/userinfo/userinfo/name',this.node).getComponent(cc.Label);
        this.m_hallId = cc.find('top/userinfo/userinfo/id',this.node).getComponent(cc.Label);
        this.m_hallgold = cc.find('top/gold/value',this.node).getComponent(cc.Label);
        this.m_inputName = cc.find('popup/userinfo/nickname/inputname',this.node);
        this.m_id = cc.find('popup/userinfo/id',this.node).getComponent(cc.Label);
        this.m_parentID = cc.find('popup/userinfo/parentid',this.node).getComponent(cc.Label);
        this.m_phone = cc.find('popup/userinfo/phone',this.node).getComponent(cc.Label);
        
        this.i_editName = cc.find('popup/userinfo/nickname/icon_change',this.node);
        this.i_hallAddGold = cc.find('top/gold/add',this.node);
        this.i_hallAvatarSpriteNode = cc.find('top/userinfo/avatar/mask',this.node);
        this.i_avatarNode = cc.find('popup/userinfo/avatar/mask',this.node);
        this.i_realName = cc.find('popup/userinfo/button_realname',this.node);
        this.i_resetPd = cc.find('popup/userinfo/button_resetpd',this.node);
        this.i_moneyflow = cc.find('popup/userinfo/button_moneyflow',this.node);
        this.i_close = cc.find('popup/userinfo/button_close',this.node);
        this.m_root.active = false;
        this.cl_ResetPdView = ResetPdView;
        this.cl_RealNameView = RealNameView;
        this.cl_MoneyFlowView = MoneyFlowView;
        this.UpdateBaseInfo();
        this.addEvent();
    }
    public click_AvatarToUser(){
        switch(this.getUserInfoButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.show();break;
        }
    } 
    public click_AddGold(){
        switch(this.getHallAddGoldButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:this.ToastShow('请联系上级充值!');break;
        }
    } 
    public click_Realname(){
        switch(this.getRealNameButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:this.cl_RealNameView.show();break;
        }
    } 
    public click_ResetPD(){
        switch(this.getChangePDButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:this.cl_ResetPdView.show();break;
        }
    } 
    public click_MoneyFlow(){
        switch(this.getMoneyFlowButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:this.cl_MoneyFlowView.show();break;
        }
    } 
    public click_Avatar(){
        switch(this.getAvatarButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:{
                this.ToastShow('正在读取文件...!')
                setTimeout(()=>{
                    if(cc.sys.isNative){
                        if(cc.sys.os === cc.sys.OS_ANDROID){
                            let sigs = '()V';
                            jsb.reflection.callStaticMethod(className, 'getImgData', sigs);
                        }else if(cc.sys.os === cc.sys.OS_IOS){
                            //jsb.reflection.callStaticMethod("AppController", "getImgData");
                        }else if(cc.sys.os === cc.sys.OS_WINDOWS){
                            Toast.getInstance().show('TIP 浏览器下无法上传头像,请使用APP上传!',this.m_toast); 
                        }
                    }else{
                        Toast.getInstance().show('TIP 浏览器下无法上传头像,请使用APP上传!',this.m_toast); 
                    }
                },1000);
            }return;break;
        }
    }
    public click_ChangeName(){
        switch(this.getChangeNameButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.changeName(this.changeNameParam);break;
        }
    } 
    public show(){
        this.UpdateUserInfo();
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addUserInfoEvent.bind(this));
    }

    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideUserInfoEvent.bind(this));
    }

    public UpdateUserInfo(){
        let UserInfo:UserInfo = this.getUserInfo();
        this.m_phone.string = '手机号: '+UserInfo.mobile;
        this.m_id.string = 'ID: '+UserInfo.member_id;
        this.m_parentID.string = '上级ID: '+UserInfo.parent_id;
        this.UpdateAvatar(UserInfo.avatar);
        this.m_inputName.getComponent(cc.EditBox).string = UserInfo.nickname;
    }
    public clearName(){
        this.m_inputName.getComponent(cc.EditBox).string = '';
        this.m_inputName.getComponent(cc.EditBox).focus();
    }
    public UpdateAvatar(Url:string){
        Tool.getInstance().LoadImageRemote(this.i_avatarNode.getChildByName('avatar'),Url,new cc.Vec2(82,82));
        Tool.getInstance().LoadImageRemote(this.i_hallAvatarSpriteNode.getChildByName('avatar'),Url,new cc.Vec2(82,82));
    }
    
    public UpdateBaseInfo(){
        let UserInfo:UserInfo = this.getUserInfo();
        this.m_hallgold.string = String(this.getBalance().rmb);
        this.m_hallId.string = 'ID: '+UserInfo.member_id;
        this.m_hallNickName.string = '昵称: '+UserInfo.nickname;
        this.m_inputName.getComponent(cc.EditBox).string = UserInfo.nickname;
        this.UpdateAvatar(UserInfo.avatar);
    }
   
    public hideUserInfoEvent(){
        this.i_moneyflow.off('touchend');
        this.i_realName.off('touchend');
        this.i_resetPd.off('touchend');
        this.i_close.off('touchend');
        this.i_avatarNode.off('touchend');
        this.i_editName.off('touchend');
        this.m_inputName.off('editing-did-ended');
    }
    public addUserInfoEvent(){
        this.i_moneyflow.on('touchend',this.click_MoneyFlow.bind(this));
        this.i_realName.on('touchend',this.click_Realname.bind(this));
        this.i_resetPd.on('touchend',this.click_ResetPD.bind(this));
        this.i_avatarNode.on('touchend',this.click_Avatar.bind(this));
        this.i_close.on('touchend',this.hide.bind(this));
        this.i_editName.on('touchend',this.clearName.bind(this));
        this.m_inputName.on('editing-did-ended',this.click_ChangeName.bind(this));
    }
    public addEvent(){
        this.i_hallAvatarSpriteNode.on('touchend',()=>{
            this.click_AvatarToUser();
        },this);
        this.i_hallAddGold.on('touchend',()=>{
            this.click_AddGold();
        },this);
    }
    public ToastShow(str:string){
        Toast.getInstance().show(str,this.m_toast);
    }
    public start(){
        
    }
    public onDestory(){
       
    }
}