import Load from "../../common/Load";
import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import AudioManager from "../../units/AudioManager";
import HttpRequest from "../../units/HttpRequest";
import Tool from "../../units/Tool";
import UserConfig from "../../units/UserConfig";

export class MAgent extends MyAnimation{
    private S_loginAgent:number;
    private S_agentUrl:string;

    public constructor(){
       super();
       this.S_loginAgent =  BUTTON_STATE.ON;
    }

    public getLoginAgentButtonState(){
        return this.S_loginAgent;
    }
    protected reqAgent(){
        HttpRequest.Req('get','/foo/level',{},Load.getInstance(),(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
               if(Success.data.level === 0){
                    this.ToastShow('您还不是代理!');
               }else{
                   //重新请求地址打开浏览器
               }
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });   
    }
    public getAgentUrlButtonState(){
        return this.S_agentUrl;
    }
    protected ToastShow(str:string){};
}


export default class AgentView extends MAgent{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;

    private i_loginAgent:cc.Node;
    private i_close:cc.Node;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root = cc.find('popup/agent',this.node);
        this.i_loginAgent = cc.find('popup/agent/button_loginagent',this.node);
        this.i_close = cc.find('popup/agent/button_close',this.node);
        this.m_root.active = false;
    }
    public click_LoginAgent(){
        switch(this.getLoginAgentButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.reqAgent();;break;
        }
    } 
    public show(){
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }
    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public hideEvent(){
        this.i_loginAgent.off('touchend');
        this.i_close.off('touchend');
    }
    public addEvent(){
        this.i_loginAgent.on('touchend',()=>{
            this.click_LoginAgent();
        },this)
        this.i_close.on('touchend',()=>{
            this.hide();
        },this);
    }

    protected ToastShow(str:string){
        Toast.getInstance().show(str,this.m_toast);
    }

    public start(){
        
    }
    public onDestory(){
        
    }
}