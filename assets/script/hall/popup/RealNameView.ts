import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";
import UserConfig from "../../units/UserConfig";


export class MRealName extends MyAnimation{
    protected realNameArr:string[];
    private S_realName:BUTTON_STATE;

    public constructor(){
       super();
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
    protected getRealNameButtonState(){
        return this.S_realName;
    }
    public getRealNameInfo():RealNameInfo{
        let result:RealNameInfo =  UserConfig.getInstance().getRealNameInfo();
        if(result.idnumber === result.realname && result.realname === ''){
            return null;
        }
        return UserConfig.getInstance().getRealNameInfo();
    }
    protected RequestRealName(RealNameParam:RealName,callBack:Function):REALNAME_RESULT{
        if(RealNameParam.realname.length === 0){
            return REALNAME_RESULT.REALNAME_LENGTH_NONE;
        }else if(RealNameParam.idnumber.length === 0){
            return REALNAME_RESULT.ID_LENGTH_NONE;
        }else if(!Tool.getInstance().isIdCardNumber(RealNameParam.idnumber)){
            return REALNAME_RESULT.ID_CHECK_ERR;
        }
        UserConfig.getInstance().setRealNameInfo(RealNameParam);
        callBack();
        return REALNAME_RESULT.SUCCESS;
    }
}


export default class RealNameView extends MRealName{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_mainRoot:cc.Node;
    private m_inputRoot:cc.Node;
    private m_showRoot:cc.Node;
    
    private i_cancle:cc.Node;
    private i_confirm:cc.Node;

    private c_inputRealName:cc.EditBox;
    private c_inputIdNumber:cc.EditBox;
    private c_realName:cc.Label;
    private c_idNumber:cc.Label;



    private _realNameParam:RealName;
    get realNameParam():RealName{
        let data:RealName = {
            realname:this.c_inputRealName.string,
            idnumber:this.c_inputIdNumber.string,
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
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{
                let resultCode = this.RequestRealName(this.realNameParam,this.setView.bind(this));
                Toast.getInstance().show(this.realNameArr[resultCode],this.m_toast);
            }break;
        }
    } 
    public setView(){
        let realNameInfo:RealNameInfo =  this.getRealNameInfo();
        if(realNameInfo){
            this.m_inputRoot.active = !(this.m_showRoot.active = true);
            this.c_realName.string = '真实姓名: '+realNameInfo.realname;
            this.c_idNumber.string = '身份证号: '+realNameInfo.idnumber.substr(0,3)+'***********'+realNameInfo.idnumber.substr(realNameInfo.idnumber.length-4);
            this.i_cancle.active = !(this.i_confirm.active = false);
        }else{
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
    public start(){
        
    }
    public onDestory(){
       
    }
}