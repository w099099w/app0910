import MyAnimation from "../common/MyAnimation";
import TimerStruct from "../common/TimerStruct";
import Toast from "../common/Toast";
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

    private _registParam:RegistRequest;
    get registParam(){
        let data:RegistRequest = {
            invateCode:this.c_inputInvateCode.string,
            phone:this.c_inputPhone.string,
            verify:this.c_inputVerify.string,
            newPd:this.c_inputNewPd.string,
            repeatPd:this.c_inputRepeatPd.string
        };
        return data;
    }

    //手机号请求验证码
    private _verifyPhoneParam:VerifyPhone;
    get verifyPhoneParam():VerifyPhone{
        let data = {
            phone:this.c_inputPhone.string
        };
        return data;
    }
   

    public constructor(Node:cc.Node){
        super();
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
        if(this.registParam.invateCode.length === 0){
            Toast.getInstance().show('邀请码不能为空',this.m_toast);
            return;
        }else if(this.registParam.phone.length === 0){
            Toast.getInstance().show('手机号不能为空',this.m_toast);
            return;
        }else if(!Tool.getInstance().isPhoneNumber(this.registParam.phone)){
            Toast.getInstance().show('请输入正确的手机号',this.m_toast);
            return;
        }else if(this.registParam.verify.length !== 6){
            Toast.getInstance().show('验证码长度应为6位',this.m_toast);
            return;
        }else if(this.registParam.newPd.length < 6){
            Toast.getInstance().show('新密码长度限制6--16位',this.m_toast);
            return;
        }else if(this.registParam.repeatPd.length === 0){
            Toast.getInstance().show('再次输入新密码不能为空',this.m_toast);
            return;
        }else if(this.registParam.newPd !== this.registParam.repeatPd){
            Toast.getInstance().show('两次输入的密码不相同,请确认',this.m_toast);
            return;
        }
        Toast.getInstance().show('ERRORCODE:500 请求服务器失败!',this.m_toast)
    }
    public requestVerify():boolean{
        //请求验证码
        let coutdown:string = this.i_getVerify.getComponent(cc.Label).string
        if(coutdown !== '获取验证码'){
            return false;
        }
        this.m_verifyCoutDown = new TimerStruct(60);
        let i = this.m_verifyCoutDown.coutDown;
        this.i_getVerify.getComponent(cc.Label).string = i+'s';
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
            if(!Tool.getInstance().isPhoneNumber(this.verifyPhoneParam.phone)){
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
}
