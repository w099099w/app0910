import SceneManager from "../common/SceneManager";
import MyAnimation from '../common/MyAnimation'
import Toast from "../common/Toast";
import ForgetPd from "./ForgetPd";
import TimerStruct from "../common/TimerStruct";
import Tool from "../units/Tool";
import Regist from "./Regist";
import UserConfig from "../units/UserConfig";

export default class Login extends MyAnimation{
    private node:cc.Node;

    private t_timerVerfyCountDown:number;

    private m_verifyCoutDown:TimerStruct;
    private m_pdView:cc.Node;
    private m_verifyView:cc.Node;
    private m_loginMethod:LOGIN_METHOD;
    private m_root:cc.Node;
    private m_chooseList:cc.Node[];
    private m_popup:cc.Node;
    private m_popupMask:cc.Node;
    private m_popupUserAgreeview:cc.Node;
    private m_toast:cc.Node;
    private m_toastParent:cc.Node;
    private m_toastMask:cc.Node;

    private i_quit:cc.Node;
    private i_remember:cc.Node;
    private i_confirm:cc.Node;
    private i_choosePd:cc.Node;
    private i_chooseVerify:cc.Node;
    private i_chooseUserAgree:cc.Node;
    private i_getVerify:cc.Node;
    private i_forgetPd:cc.Node;
    private i_regist:cc.Node;
    

    //密码登录
    private c_pdViewPhoneInput:cc.EditBox;
    private c_pdViewPdInput:cc.EditBox;
    private _pdLoginParam:PdLogin;
	get pdLoginParam(): PdLogin{
        let data = {
            phone:this.c_pdViewPhoneInput.string,
            password:this.c_pdViewPdInput.string,
        };
		return data;
    }
    //验证码登录
    private c_verifyViewPhoneInput:cc.EditBox;
    private c_verifyViewVerfyInput:cc.EditBox;
    private _verifyLoginParam:VerifyLogin;
    get verifyLoginParam(): VerifyLogin{
        let data = {
            phone:this.c_verifyViewPhoneInput.string,
            verify:this.c_verifyViewVerfyInput.string,
        };
		return data;
    }
    //手机号请求验证码
    private _verifyPhoneParam:VerifyPhone;
    get verifyPhoneParam():VerifyPhone{
        let data = {
            phone:this.c_verifyViewPhoneInput.string,
        };
        return data;
    }

    private cl_forgetPd:ForgetPd;
    private cl_regist:Regist;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_loginMethod = 0;
        this.m_pdView = cc.find('login/view/password',this.node);
        this.m_verifyView = cc.find('login/view/verify',this.node);
        this.m_chooseList = cc.find('login/choose',this.node).children;
        this.m_root = cc.find('login',this.node);
        this.m_popup = cc.find('popup',this.node);
        this.m_popupMask = cc.find('popup/mask',this.node);
        this.m_popupUserAgreeview = cc.find('popup/useragree',this.node);
        this.m_toastParent = cc.find('common',this.node);
        this.m_toast = cc.find('common/toast',this.node);
        this.m_toastMask = cc.find('common/mask',this.node);

        this.i_quit = cc.find('login/button_quit',this.node),
        this.i_choosePd = cc.find('login/choose/pdlogin',this.node);
        this.i_chooseVerify = cc.find('login/choose/velogin',this.node);
        this.i_chooseUserAgree = cc.find('login/useragree/base',this.node);
        this.i_confirm = cc.find('login/button_confirm',this.node);
        this.i_remember = cc.find('login/view/password/remeberpd/base',this.node);
        this.i_getVerify = cc.find('login/view/verify/getverify',this.node);
        this.i_forgetPd = cc.find('login/view/password/forgetpd',this.node);
        this.i_regist = cc.find('login/button_regist',this.node);
        this.i_remember.parent.getChildByName('isagree').active = false;
        this.i_chooseUserAgree.parent.getChildByName('isagree').active = false;
        
        this.c_verifyViewPhoneInput = cc.find('login/view/verify/input_phone/input',this.node).getComponent(cc.EditBox);
        this.c_verifyViewVerfyInput = cc.find('login/view/verify/input_verify/input',this.node).getComponent(cc.EditBox);
        this.c_pdViewPhoneInput= cc.find('login/view/password/input_phone/input',this.node).getComponent(cc.EditBox);
        this.c_pdViewPdInput= cc.find('login/view/password/input_pd/input',this.node).getComponent(cc.EditBox);

        this.cl_forgetPd = new ForgetPd(this.node);
        this.cl_regist = new Regist(this.node);
    
        this.reset();
        this.hide();
      
    }
    public requestPdLogin(){
        //网络请求从pdLogin拉取信息
        if(this.pdLoginParam.phone.length == 0){
            Toast.getInstance().show('手机号不能为空',this.m_toast);
            return;
        }else if(!Tool.getInstance().isPhoneNumber(this.pdLoginParam.phone)){
            Toast.getInstance().show('请输入正确的手机号',this.m_toast);
            return;
        }else if(this.pdLoginParam.password.length < 6){
            Toast.getInstance().show('密码长度限制6--16位',this.m_toast);
            return;
        }else if(!this.i_chooseUserAgree.parent.getChildByName('isagree').active){
            Toast.getInstance().show('请先同意勾选用户协议',this.m_toast);
            return;
        }
        cc.sys.localStorage.setItem('remberpd',JSON.stringify(this.pdLoginParam));
        UserConfig.getInstance().setUserInfo({phone:this.pdLoginParam.phone});
        SceneManager.getInstance().loadScene('hall');
    }
    public requestVerifyLogin(){
        //网络请求从pdLogin拉取信息
        if(this.verifyLoginParam.phone.length == 0){
            Toast.getInstance().show('手机号不能为空',this.m_toast);
            return;
        }else if(!Tool.getInstance().isPhoneNumber(this.verifyLoginParam.phone)){
            Toast.getInstance().show('请输入正确的手机号',this.m_toast);
            return;
        }else if(this.verifyLoginParam.verify.length !== 6){
            Toast.getInstance().show('验证码长度应为6位',this.m_toast);
            return;
        }else if(!this.i_chooseUserAgree.parent.getChildByName('isagree').active){
            Toast.getInstance().show('请先同意勾选用户协议',this.m_toast);
            return;
        }
        SceneManager.getInstance().loadScene('hall');
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
    public reset() {
        let remberpd:PdLogin = JSON.parse(cc.sys.localStorage.getItem('remberpd'));
        let userAgree:boolean = JSON.parse(cc.sys.localStorage.getItem('userAgree'));
        this.i_chooseUserAgree.parent.getChildByName('isagree').active = userAgree;
        if(remberpd){
            this.c_pdViewPhoneInput.string = remberpd.phone;
            this.c_pdViewPdInput.string  = remberpd.password;
            this.i_remember.parent.getChildByName('isagree').active = true;
        }else{
            this.c_pdViewPhoneInput.string = '';
            this.c_pdViewPdInput.string  = '';
            this.i_remember.parent.getChildByName('isagree').active = false;
        }
        this.c_verifyViewPhoneInput.string = '';
        this.c_verifyViewVerfyInput.string = '';
    }
    public switchLoginMethod(MethodID:LOGIN_METHOD){
        if(this.m_verifyCoutDown && this.m_verifyCoutDown.getSurPlus() > 0){
            this.setVerifyCountDown(this.m_verifyCoutDown.getSurPlus());
        }
        this.m_loginMethod = MethodID;
        this.i_choosePd.parent.sortAllChildren();
        if(MethodID == 0){
            this.i_choosePd.getChildByName('value').getComponent('switchsp').setSpriteFrame(1);
            this.i_chooseVerify.getChildByName('value').getComponent('switchsp').setSpriteFrame(0);
            this.m_pdView.active = true;
            this.m_verifyView.active = false;
        }else if(MethodID == 1){
            this.i_choosePd.getChildByName('value').getComponent('switchsp').setSpriteFrame(0);
            this.i_chooseVerify.getChildByName('value').getComponent('switchsp').setSpriteFrame(1);
            this.m_pdView.active = false;
            this.m_verifyView.active = true;
        }
        this.reset();
    }
    public show(){
        this.popupOpenScaleXY(this.m_root);
        this.m_chooseList.forEach((item,key)=>{
            item.on('touchend',()=>{
                if(item.name == 'velogin'){
                    this.i_chooseVerify.zIndex = 1;
                    this.i_choosePd.zIndex = 0;
                    this.switchLoginMethod(LOGIN_METHOD.PHONE_VERIFY);
                }else{
                    this.i_chooseVerify.zIndex = 0;
                    this.i_choosePd.zIndex = 1;
                    this.switchLoginMethod(LOGIN_METHOD.PASSWORD);
                }
            })
        },this);
        this.addEvent();
    }
    public hide(){
        this.m_chooseList.forEach((item,key)=>{
            item.off('touchend');
        },this);
        this.m_root.active = false;
    }
    public showUserAgree(){
        this.i_chooseUserAgree.parent.getChildByName('label').off('touchend');
        this.popupOpenScaleY(this.m_popupUserAgreeview,this.m_popupMask,()=>{
            this.m_popupUserAgreeview.getChildByName('button_confirm').on('touchend',()=>{
                this.hideUserAgree();
            },this);
        })
    }
    public hideUserAgree(){
        this.i_chooseUserAgree.parent.getChildByName('label').on('touchend',()=>{
            this.showUserAgree();
        },this);
        this.popupCloseScaleY(this.m_popupUserAgreeview,this.m_popupMask,()=>{
            this.m_popupUserAgreeview.getChildByName('button_confirm').off('touchend');
        })
    }
    public addEvent(){
        this.i_chooseUserAgree.on('touchend',()=>{
            this.i_chooseUserAgree.parent.getChildByName('isagree').active = !this.i_chooseUserAgree.parent.getChildByName('isagree').active;
            if(this.i_chooseUserAgree.parent.getChildByName('isagree').active){
                cc.sys.localStorage.setItem('userAgree',JSON.stringify(true));
            }else{
                cc.sys.localStorage.removeItem('userAgree');
            }
        },this);
        this.i_chooseUserAgree.parent.getChildByName('label').on('touchend',()=>{
            this.showUserAgree();
        },this);
        this.i_remember.on('touchend',()=>{
            this.i_remember.parent.getChildByName('isagree').active = !this.i_remember.parent.getChildByName('isagree').active;
            if(this.i_remember.parent.getChildByName('isagree').active){
                cc.sys.localStorage.setItem('remberpd',JSON.stringify(this.pdLoginParam));
            }else{
                cc.sys.localStorage.removeItem('remberpd');
            }
        },this);
        this.i_quit.on('touchend',()=>{
            SceneManager.getInstance().endgame();
        },this);
        this.i_forgetPd.on('touchend',()=>{
            this.cl_forgetPd.show();
        },this);
        this.i_regist.on('touchend',()=>{
            this.cl_regist.show();
        },this);
        this.i_confirm.on('touchend',()=>{
            switch(this.m_loginMethod){
                case LOGIN_METHOD.PASSWORD:this.requestPdLogin();break;
                case LOGIN_METHOD.PHONE_VERIFY:this.requestVerifyLogin();break;
            }
        },this);
        this.i_getVerify.on('touchend',()=>{
            if(!Tool.getInstance().isPhoneNumber(this.verifyPhoneParam.phone)){
                Toast.getInstance().show('请输入正确的手机号',this.m_toast);
                return false;
            }
            if(!this.requestVerify()){
                Toast.getInstance().show('请在倒计时结束后获取验证码',this.m_toast);
            }
        },this);
    }
    public onDestroy(){
        if(this.t_timerVerfyCountDown){
            clearInterval(this.t_timerVerfyCountDown)
            this.t_timerVerfyCountDown = null;
        }
        this.m_verifyCoutDown = null;  
    }
}
