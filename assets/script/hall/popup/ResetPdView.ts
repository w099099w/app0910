import Load from "../../common/Load";
import MyAnimation from "../../common/MyAnimation";
import SceneManager from "../../common/SceneManager";
import Toast from "../../common/Toast";
import HttpRequest from "../../units/HttpRequest";
import UserConfig from "../../units/UserConfig";

export class MResetPd extends MyAnimation{
    protected resetPdStateArr:string[];
    private S_resetPd:BUTTON_STATE;

    public constructor(){
       super();
       this.resetPdStateArr = [
           '密码修改失败!',
           '输入密码不能为空!',
           '密码长度不正确,限制6-16位!',
           '确认新密码和新密码不一致!',
           '原密码不正确!',
           '密码修改成功,正在注销登录'
       ];
       this.S_resetPd = BUTTON_STATE.ON;
    }
    protected getResetPdButtonState(){
        return this.S_resetPd;
    }
    public getUserInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
    protected RequestChangePd(ResetPdParam:ChangeInfo):RESETPD_RESULT{
        if(ResetPdParam.field_one.length === 0 || ResetPdParam.field_two.length === 0){
            this.ToastShow(this.resetPdStateArr[RESETPD_RESULT.PASSWORD_LENGTH_NONE]);
            return;
        }else if(ResetPdParam.field_one.length < 6 || ResetPdParam.field_two.length < 6){
            this.ToastShow(this.resetPdStateArr[RESETPD_RESULT.PASSWORD_LENGTH_ERROR])
            return;
        }
        HttpRequest.Req('put','/foo/modify',ResetPdParam,Load.getInstance(),(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                this.ToastShow(this.resetPdStateArr[RESETPD_RESULT.SUCCESS]);
                setTimeout(()=>{
                    SceneManager.getInstance().loadScene('passport');
                },1500);
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });   
    }
    protected ToastShow(str:string){};
}


export default class ResetPdView extends MResetPd{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_mainRoot:cc.Node;

    private i_cancle:cc.Node;
    private i_confirm:cc.Node;

    private c_inputOldPd:cc.EditBox;
    private c_inputNewPd:cc.EditBox;
    private c_inputConfirmPd:cc.EditBox;


    private _resetPdParam:ChangeInfo;
    get resetPdParam():ChangeInfo{
        let data:ChangeInfo = {
            field_one:this.c_inputOldPd.string,
            field_two:this.c_inputNewPd.string,
            genre:3
        };
        return data;
    }

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/resetpd/mask',this.node);
        this.m_root = cc.find('popup/resetpd/root',this.node);
        this.m_mainRoot = cc.find('popup/resetpd',this.node);

        this.i_cancle = cc.find('popup/resetpd/root/button_cancle',this.node);
        this.i_confirm = cc.find('popup/resetpd/root/button_confirm',this.node);

        this.c_inputOldPd = cc.find('popup/resetpd/root/input_oldpd/input',this.node).getComponent(cc.EditBox);
        this.c_inputNewPd = cc.find('popup/resetpd/root/input_newpd/input',this.node).getComponent(cc.EditBox);
        this.c_inputConfirmPd = cc.find('popup/resetpd/root/input_confirmpd/input',this.node).getComponent(cc.EditBox);
        this.m_mainRoot.active = false;
    }
    public click_confirm(){
        switch(this.getResetPdButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{
                if(this.resetPdParam.field_two !== this.c_inputConfirmPd.string){
                    this.ToastShow(this.resetPdStateArr[RESETPD_RESULT.PASSWORD_NO_SAME]);
                    return;
                }
                this.RequestChangePd(this.resetPdParam);
            }break;
        }
    } 
    public show(){
        this.c_inputConfirmPd.string = this.c_inputNewPd.string = this.c_inputOldPd.string = '';
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