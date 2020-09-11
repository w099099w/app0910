import SceneManager from "../units/SceneManager";
interface pdLogin {
    phone: string;
    pd: string;
}
interface verifyLogin {
    phone: string;
    verify: string;
}
export default class Login{
    private node:cc.Node;
    private m_pdView:cc.Node;
    private m_verifyView:cc.Node;
    private m_loginMethod:number;
    private m_root:cc.Node;
    private m_chooseList:cc.Node[];
    private m_choosePd:cc.Node;
    private m_chooseVerify:cc.Node;
    private m_chooseUserAgree:cc.Node;
    private m_popup:cc.Node;
    private m_popupMask:cc.Node;
    private m_popupUserAgreeview:cc.Node;
    private m_button_quit:cc.Node;
    private m_remember:cc.Node;
    //密码登录
    private c_pdViewPhoneInput:cc.EditBox;
    private c_pdViewPdInput:cc.EditBox;
    private _pdLogin:pdLogin;
	get pdLogin(): pdLogin{
        let loginInfo = {
            phone:this.c_pdViewPhoneInput.string,
            pd:this.c_pdViewPdInput.string,
        };
		return loginInfo;
    }
    //验证码登录
    private c_verifyViewPhoneInput:cc.EditBox;
    private c_verifyViewVerfyInput:cc.EditBox;
    private _verifyLogin:verifyLogin;
    get verifyLogin(): verifyLogin{
        let loginInfo = {
            phone:this.c_pdViewPhoneInput.string,
            verify:this.c_pdViewPdInput.string,
        };
		return loginInfo;
    }

    public constructor(Node:cc.Node){
        this.node = Node;
        this.m_pdView = cc.find('login/view/password',this.node);
        this.m_verifyView = cc.find('login/view/verify',this.node);
        this.c_verifyViewPhoneInput = cc.find('login/view/verify/input_phone/input',this.node).getComponent(cc.EditBox);
        this.c_verifyViewVerfyInput = cc.find('login/view/verify/input_verify/input',this.node).getComponent(cc.EditBox);
        this.c_pdViewPhoneInput= cc.find('login/view/password/input_phone/input',this.node).getComponent(cc.EditBox);
        this.c_pdViewPdInput= cc.find('login/view/password/input_pd/input',this.node).getComponent(cc.EditBox);
        this.m_chooseList = cc.find('login/choose',this.node).children;
        this.m_choosePd = cc.find('login/choose/pdlogin',this.node);
        this.m_chooseVerify = cc.find('login/choose/velogin',this.node);
        this.m_chooseUserAgree = cc.find('login/useragree/base',this.node);
        this.m_root = cc.find('login',this.node);
        this.m_popup = cc.find('popup',this.node);
        this.m_popupMask = cc.find('popup/mask',this.node);
        this.m_popupUserAgreeview = cc.find('popup/useragree',this.node);
        this.m_button_quit = cc.find('login/button_quit',this.node),
        this.m_remember = cc.find('login/view/password/remeberpd/base',this.node);
        this.m_remember.parent.getChildByName('isagree').active = false;
        this.m_chooseUserAgree.parent.getChildByName('isagree').active = false;
        this.m_loginMethod = 0;
        this.reset();
        this.hide();
    }
    public requestPdLogin(){
        //网络请求从pdLogin拉取信息
    }
    public requestVerifyLogin(){
        //网络请求从pdLogin拉取信息
    }
    public reset() {
        this.c_verifyViewPhoneInput.string = '';
        this.c_verifyViewVerfyInput.string = '';
        this.c_pdViewPhoneInput.string = '';
        this.c_pdViewPdInput.string  = '';
    }
    public switchLoginMethod(MethodID:number){
        this.m_loginMethod = MethodID;
        this.m_choosePd.parent.sortAllChildren();
        if(MethodID == 0){
            this.m_choosePd.getChildByName('value').getComponent('switchsp').setSpriteFrame(1);
            this.m_chooseVerify.getChildByName('value').getComponent('switchsp').setSpriteFrame(0);
            this.m_pdView.active = true;
            this.m_verifyView.active = false;
        }else if(MethodID == 1){
            this.m_choosePd.getChildByName('value').getComponent('switchsp').setSpriteFrame(0);
            this.m_chooseVerify.getChildByName('value').getComponent('switchsp').setSpriteFrame(1);
            this.m_pdView.active = false;
            this.m_verifyView.active = true;
        }
        this.c_verifyViewPhoneInput.string = '';
        this.c_verifyViewVerfyInput.string = '';
        this.c_pdViewPhoneInput.string = '';
        this.c_pdViewPdInput.string  = '';
    }
    public show(){
        this.m_root.active = true;
        this.m_chooseList.forEach((item,key)=>{
            item.on('touchend',()=>{
                if(item.name == 'velogin'){
                    this.m_chooseVerify.zIndex = 1;
                    this.m_choosePd.zIndex = 0;
                    this.switchLoginMethod(1);
                }else{
                    this.m_chooseVerify.zIndex = 0;
                    this.m_choosePd.zIndex = 1;
                    this.switchLoginMethod(0);
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
        this.m_chooseUserAgree.parent.getChildByName('label').off('touchend');
        this.m_popup.active = true;
        this.m_popupMask.active = true;
        this.m_popupUserAgreeview.scaleY = 0;
        cc.tween(this.m_popupUserAgreeview).to(0.2,{scaleY:1},{easing:'quadIn'}).call(()=>{
            this.m_popupUserAgreeview.getChildByName('button_confirm').on('touchend',()=>{
                this.hideUserAgree();
            },this);
        }).start();
    }
    public hideUserAgree(){
        this.m_chooseUserAgree.parent.getChildByName('label').on('touchend',()=>{
            this.showUserAgree();
        },this);
        cc.tween(this.m_popupUserAgreeview).to(0.2,{scaleY:0},{easing:'quadOut'}).call(()=>{
            this.m_popupUserAgreeview.getChildByName('button_confirm').off('touchend');
            this.m_popup.active = false;
            this.m_popupMask.active = false;
        }).start();
    }
    public addEvent(){
        this.m_chooseUserAgree.on('touchend',()=>{
            this.m_chooseUserAgree.parent.getChildByName('isagree').active = !this.m_chooseUserAgree.parent.getChildByName('isagree').active;
        },this);
        this.m_chooseUserAgree.parent.getChildByName('label').on('touchend',()=>{
            this.showUserAgree();
        },this);
        this.m_button_quit.on('touchend',()=>{
            SceneManager.endgame();
        },this);
        this.m_remember.on('touchend',()=>{
            this.m_remember.parent.getChildByName('isagree').active = !this.m_remember.parent.getChildByName('isagree').active;
        },this)
    }
}
