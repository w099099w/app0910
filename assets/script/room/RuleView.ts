import MyAnimation from "../common/MyAnimation";
import Toast from "../common/Toast";
import UserConfig from "../units/UserConfig";


export class MRule extends MyAnimation{
    public constructor(){
       super();
    }
    protected getUserInfo():UserInfo{
        return UserConfig.getInstance().getUserInfo();
    }
}


export default class RuleView extends MRule{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;

    private c_max:cc.Label;
    private c_min:cc.Label;
    private c_rule:cc.Label;
    private c_gamenum:cc.Label;

    private i_close:cc.Node;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node.parent);
        this.m_mask = cc.find('mask',this.node);
        this.m_root = cc.find('gamerule',this.node);
    
    
        this.c_max = cc.find('gamerule/maxbet/value',this.node).getComponent(cc.Label);
        this.c_min = cc.find('gamerule/minbet/value',this.node).getComponent(cc.Label);
        this.c_rule = cc.find('gamerule/rule/value',this.node).getComponent(cc.Label);
        this.c_gamenum = cc.find('gamerule/gamenum/value',this.node).getComponent(cc.Label);

        this.i_close = cc.find('gamerule/button_close',this.node);
        this.m_mask.active = false;
        this.m_root.active = false;
    }
    public show(SanGongRuleInfo:SanGongRuleInfo){
        if(!SanGongRuleInfo || !SanGongRuleInfo.min || !SanGongRuleInfo.max || !SanGongRuleInfo.rule){
            Toast.getInstance().show('数据错误!',this.m_toast)
            return;
        }
        this.node.active = true;
        this.c_min.string = '底注: '+String(SanGongRuleInfo.min);
        this.c_max.string = '下注封顶: '+String(SanGongRuleInfo.max);
        this.c_rule.string = String(SanGongRuleInfo.rule);
        this.c_gamenum.string = '局数: '+String(SanGongRuleInfo.gamenum);
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }
    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.HideEvent.bind(this));
    }
   
    public HideEvent(){
        this.i_close.off('touchend');
    }
    public addEvent(){
        this.i_close.on('touchend',this.hide.bind(this));
    }
    public start(){
    
    }
    public onDestory(){

    }
}