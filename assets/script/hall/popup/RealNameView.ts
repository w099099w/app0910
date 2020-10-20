import Load from "../../common/Load";
import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import HttpRequest from "../../units/HttpRequest";
import Tool from "../../units/Tool";
import UserConfig from "../../units/UserConfig";


export class MRealName extends MyAnimation{
    protected realNameArr:string[];
    private S_realName:BUTTON_STATE;

    public constructor(){
       super();
       this.reqRealName();
       this.realNameArr = [
           '实名认证失败!',
           '实名认证成功!',
           '真实姓名不能为空',
           '身份证号不能为空!',
           '请输入正确的身份证号!',
           '输入信息无法被验证,请稍后再试或联系客服',
       ];
       this.S_realName = BUTTON_STATE.ON;
    }
    protected reqRealName(){
        if(this.getUserInfo().is_real === 2){
            HttpRequest.Req('get','/foo/mine/verified',{},null,(Success:HttpReq)=>{
                if(Success.code === 0 && Success.message === 'OK'){
                    UserConfig.getInstance().setRealName(Success.data);
                    this.setView();
                }
            },(Failed:HttpReq)=>{
                this.ToastShow(Failed.message);
            });
        }
    }
    protected getRealNameButtonState(){
        return this.S_realName;
    }
    protected getUserInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    public getRealNameInfo():RealNameInfo{
        let result:RealNameInfo =  UserConfig.getInstance().realNameInfo;
        if(result.id_card === result.real_name && result.real_name === ''){
            return null;
        }
        return result;
    }
    protected RequestRealName(RealNameParam:ChangeInfo):REALNAME_RESULT{
        if(RealNameParam.field_one.length === 0){
            this.ToastShow(this.realNameArr[REALNAME_RESULT.REALNAME_LENGTH_NONE]);
            return;
        }else if(RealNameParam.field_two.length === 0){
            this.ToastShow(this.realNameArr[REALNAME_RESULT.ID_LENGTH_NONE]);
            return;
        }else if(!Tool.getInstance().isIdCardNumber(RealNameParam.field_two)){
            this.ToastShow(this.realNameArr[REALNAME_RESULT.ID_CHECK_ERR]);
            return;
        }
        HttpRequest.Req('put','/foo/modify',RealNameParam,Load.getInstance(),(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                UserConfig.getInstance().setUserInfo({is_real:2});
                UserConfig.getInstance().setRealName({real_name:RealNameParam.field_one,id_card:RealNameParam.field_two,member_id:this.getUserInfo().member_id});
                this.setView();
                this.ToastShow('实名认证完成!');
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });
    }

    protected setView(){};
    protected ToastShow(str:string){};
}


export default class RealNameView extends MRealName{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_mainRoot:cc.Node;
    private m_inputRoot:cc.Node;
    private m_showRoot:cc.Node;
    private m_tip:cc.Node;
    
    private i_cancle:cc.Node;
    private i_confirm:cc.Node;

    private c_inputRealName:cc.EditBox;
    private c_inputIdNumber:cc.EditBox;
    private c_realName:cc.Label;
    private c_idNumber:cc.Label;



    private _realNameParam:ChangeInfo;
    get realNameParam():ChangeInfo{
        let data:ChangeInfo = {
            genre:2,
            field_one:this.c_inputRealName.string,
            field_two:this.c_inputIdNumber.string,
        };
        return data;
    }

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/realname/mask',this.node);
        this.m_root = cc.find('popup/realname/root',this.node);
        this.m_mainRoot = cc.find('popup/realname',this.node);
        this.m_inputRoot = cc.find('popup/realname/root/input',this.node);
        this.m_showRoot = cc.find('popup/realname/root/show',this.node);
        this.m_tip = cc.find('popup/realname/root/tip',this.node);

        this.i_cancle = cc.find('popup/realname/root/button_layout/button_cancle',this.node);
        this.i_confirm = cc.find('popup/realname/root/button_layout/button_confirm',this.node);

        this.c_inputRealName = cc.find('popup/realname/root/input/input_realname/input',this.node).getComponent(cc.EditBox);
        this.c_inputIdNumber = cc.find('popup/realname/root/input/input_idcardnumber/input',this.node).getComponent(cc.EditBox);
        this.c_realName = cc.find('popup/realname/root/show/realname',this.node).getComponent(cc.Label);
        this.c_idNumber = cc.find('popup/realname/root/show/idcardnumber',this.node).getComponent(cc.Label);
        
        this.m_mainRoot.active = false;
    }
    public click_confirm(){
        switch(this.getRealNameButtonState()){
            case BUTTON_STATE.OFF:this.ToastShow('暂未开放!');break;
            case BUTTON_STATE.ON:this.RequestRealName(this.realNameParam);break;
        }
    } 
    public setView(){
        let realNameInfo:RealNameInfo =  this.getRealNameInfo();
        if(realNameInfo){
            this.m_tip.active = false;
            this.m_inputRoot.active = !(this.m_showRoot.active = true);
            this.c_realName.string = '真实姓名: '+realNameInfo.real_name;
            this.c_idNumber.string = '身份证号: '+realNameInfo.id_card.substr(0,3)+'***********'+realNameInfo.id_card.substr(realNameInfo.id_card.length-4);
            this.i_cancle.active = !(this.i_confirm.active = false);
        }else{
            this.m_tip.active = true;
            this.m_inputRoot.active = !(this.m_showRoot.active = false);
            this.c_inputIdNumber.string = '';
            this.c_inputRealName.string = '';
            this.i_cancle.active = this.i_confirm.active = true;
        }
    }
    public show(){
        this.setView();
        this.popupOpenScaleY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }

    public hide(){
        this.popupCloseScaleY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public hideEvent(){
        this.i_cancle.off('touchend');
        this.i_confirm.off('touchend');
    }
    public addEvent(){
       this.i_cancle.on('touchend',this.hide.bind(this));
       this.i_confirm.on('touchend',this.click_confirm.bind(this));
    }

    protected ToastShow(str:string){
        Toast.getInstance().show(str,this.m_toast);
    }
    public start(){
        
    }
    public onDestory(){
       
    }
}