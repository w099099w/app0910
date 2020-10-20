import Load from "../common/Load";
import MyAnimation from "../common/MyAnimation";
import TimerStruct from "../common/TimerStruct";
import Toast from "../common/Toast";
import HttpRequest from "../units/HttpRequest";
import Tool from "../units/Tool";

export default class Regist extends MyAnimation{
    private node:cc.Node;

    private t_timerVerfyCountDown:number;

    private m_verifyCoutDown:TimerStruct;
    private m_root:cc.Node;
    private m_mask:cc.Node;
    private m_toast:cc.Node;

    private i_cancle:cc.Node;
    private i_confirm:cc.Node;
    private i_getVerify:cc.Node;

    private c_inputInvateCode:cc.EditBox;
    private c_inputPhone:cc.EditBox;
    private c_inputVerify:cc.EditBox;
    private c_inputNewPd:cc.EditBox;
    private c_inputRepeatPd:cc.EditBox;

    private _m_types:number;
    get m_types():number{
        return this._m_types;
    }
    set m_types(val:number){
        this._m_types = val;
    }

    private _registParam:RegistRequest;
    get registParam(){
        let data:RegistRequest = {
            parent_id:Number(this.c_inputInvateCode.string),
            mobile:this.c_inputPhone.string,
            code:this.c_inputVerify.string,
            password:this.c_inputNewPd.string,
            types:this._m_types
        };
        return data;
    }

    //手机号请求验证码
    private _verifyPhoneParam:VerifyPhone;
    get verifyPhoneParam():VerifyPhone{
        let data = {
            types:1,
            mobile:this.c_inputPhone.string
        };
        return data;
    }
   

    public constructor(Node:cc.Node){
        super();
        this.m_types = 1;
        this.node = Node;
        this.m_root = cc.find('popup/regist',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_toast = cc.find('common/toast',this.node);

        this.i_cancle = cc.find('popup/regist/button_cancle',this.node);
        this.i_confirm = cc.find('popup/regist/button_confirm',this.node);
        this.i_getVerify = cc.find('popup/regist/getverify',this.node);

        this.c_inputInvateCode = cc.find('popup/regist/input_invatecode/input',this.node).getComponent(cc.EditBox);
        this.c_inputPhone = cc.find('popup/regist/input_phone/input',this.node).getComponent(cc.EditBox);
        this.c_inputVerify = cc.find('popup/regist/input_verify/input',this.node).getComponent(cc.EditBox);
        this.c_inputNewPd = cc.find('popup/regist/input_newpd/input',this.node).getComponent(cc.EditBox);
        this.c_inputRepeatPd = cc.find('popup/regist/input_repeatpd/input',this.node).getComponent(cc.EditBox);

        this.reset();
    }
    public reset(){
        this.m_root.active = false;
        this.m_root.parent.active = true;
        this.m_mask.active = false;
    }
    public show(){
        if(this.m_verifyCoutDown && this.m_verifyCoutDown.getSurPlus() > 0){
            this.setVerifyCountDown(this.m_verifyCoutDown.getSurPlus());
        }
        this.popupOpenScaleXY(this.m_root,this.m_mask);
        this.addEvent();
    }
    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,()=>{
            this.c_inputInvateCode.string = '';
            this.c_inputPhone.string = '';
            this.c_inputVerify.string = '';
            this.c_inputNewPd.string = '';
            this.c_inputRepeatPd.string = '';
        });
        this.closeEvent();
    }
    public requestForgetPd(){
        if(String(this.registParam.parent_id).length === 0){
            Toast.getInstance().show('邀请码不能为空',this.m_toast);
            return;
        }else if(this.registParam.mobile.length === 0){
            Toast.getInstance().show('手机号不能为空',this.m_toast);
            return;
        }else if(!Tool.getInstance().isPhoneNumber(this.registParam.mobile)){
            Toast.getInstance().show('请输入正确的手机号',this.m_toast);
            return;
        }else if(this.registParam.code.length !== 6){
            Toast.getInstance().show('验证码长度应为6位',this.m_toast);
            return;
        }else if(this.registParam.password.length < 6){
            Toast.getInstance().show('新密码长度限制6--16位',this.m_toast);
            return;
        }else if(this.registParam.password.length === 0){
            Toast.getInstance().show('再次输入新密码不能为空',this.m_toast);
            return;
        }else if(this.registParam.password !== this.c_inputRepeatPd.string){
            Toast.getInstance().show('两次输入的密码不相同,请确认',this.m_toast);
            return;
        }
        HttpRequest.Req('post','/foo/sign-up',this.registParam,Load.getInstance(),(Success)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                Toast.getInstance().show('注册成功!',this.m_toast);
            }
        },(Failed)=>{
            Toast.getInstance().show(Failed.message,this.m_toast);
        }) 
        //Toast.getInstance().show('ERRORCODE:500 请求服务器失败!',this.m_toast)
    }
    public requestVerify():boolean{
        //请求验证码
        let coutdown:string = this.i_getVerify.getComponent(cc.Label).string
        if(coutdown !== '获取验证码'){
            return false;
        }
        HttpRequest.Req('post','/foo/mobile/code',this.verifyPhoneParam,null,(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                Toast.getInstance().show('验证码已发送到手机 '+ this.verifyPhoneParam.mobile+' 请注意查收',this.m_toast);
                this.m_verifyCoutDown = new TimerStruct(60);
                this.setVerifyCountDown(60);
            }
        },(Failed:HttpReq)=>{
            Toast.getInstance().show(Failed.message,this.m_toast);
        }); 
        return true;
    }

    public setVerifyCountDown(Time:number){
        let i = Time;
        this.i_getVerify.getComponent(cc.Label).string = i+'s';
        if(this.t_timerVerfyCountDown){
            clearInterval(this.t_timerVerfyCountDown);
            this.t_timerVerfyCountDown = null;
        }
        this.t_timerVerfyCountDown = setInterval(()=>{
            i--;
            if(i == 0){
                this.i_getVerify.getComponent(cc.Label).string = '获取验证码';
                this.m_verifyCoutDown = null;
                clearInterval(this.t_timerVerfyCountDown);
                this.t_timerVerfyCountDown = null;
            }else{
                this.i_getVerify.getComponent(cc.Label).string = i+'s';
            }
        },1000);
        return true;
    }
    public addEvent(){
        this.i_getVerify.on('touchend',()=>{
            if(!Tool.getInstance().isPhoneNumber(this.verifyPhoneParam.mobile)){
                Toast.getInstance().show('请输入正确的手机号',this.m_toast);
                return;
            }
            if(!this.requestVerify()){
                Toast.getInstance().show('请在倒计时结束后获取验证码',this.m_toast);
            }
        },this);
        this.i_confirm.on('touchend',()=>{
            this.requestForgetPd();
        },this);
        this.i_cancle.on('touchend',()=>{
            this.hide();
        },this);
    }
    public closeEvent(){
        this.i_getVerify.off('touchend');
        this.i_confirm.off('touchend');
        this.i_cancle.off('touchend');
    }
    public onDestroy(){
        if(this.t_timerVerfyCountDown){
            clearInterval(this.t_timerVerfyCountDown);
            this.t_timerVerfyCountDown = null;
        }
    }
}
