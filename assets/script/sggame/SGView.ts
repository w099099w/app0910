// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import RuleView from "../room/RuleView";
import UserConfig from "../units/UserConfig";
import SGSetView from "./SGSetView";

export class SanGong extends MyAnimation {
    private S_Rule:BUTTON_STATE;
    private S_Set:BUTTON_STATE;
    private S_BackToRoom:BUTTON_STATE;
    private S_Chat:BUTTON_STATE;
    private S_BiaoQin:BUTTON_STATE;
    protected constructor(){
        super();
        this.S_Chat = this.S_BiaoQin = BUTTON_STATE.OFF;
        this.S_Set = this.S_Rule = this.S_BackToRoom = BUTTON_STATE.ON;
    }
    protected getRuleButtonState(){
        return this.S_Rule;
    }
    protected getSetButtonState(){
        return this.S_Set;
    }
    protected getBackToRoomButtonState(){
        return this.S_BackToRoom;
    }
    protected getChatButtonState(){
        return this.S_Chat;
    }
    protected getBiaoQinButtonState(){
        return this.S_BiaoQin;
    }
    protected getTableInfo():SanGongRuleInfo{
        return UserConfig.getInstance().getTableInfo();
    }

}

export default class SGView extends SanGong {
    private cl_RuleView: RuleView;
    private cl_SGSetViw:SGSetView;
    
    private node:cc.Node;

    private m_toast:cc.Node;

    private i_rule:cc.Node;
    private i_set:cc.Node;
    private i_backRomm:cc.Node;
    private i_chat:cc.Node;
    private i_biaoQin:cc.Node;

    private c_tableInfo:cc.Label;

  

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        
        this.i_rule =  cc.find('mainbutton/button_rule',this.node);
        this.i_set =  cc.find('mainbutton/button_set',this.node);
        this.i_backRomm =  cc.find('mainbutton/button_back',this.node);
        this.i_chat =  cc.find('mainbutton/button_chat',this.node);
        this.i_biaoQin =  cc.find('mainbutton/button_bq',this.node);

        this.c_tableInfo = cc.find('tableInfo',this.node).getComponent(cc.Label);
        this.cl_RuleView = new RuleView(cc.find('popup',this.node));
        this.cl_SGSetViw = new SGSetView(this.node);
        this.addEvent();
    }
    private setTableInfo(){
        let TableInfo:SanGongRuleInfo = this.getTableInfo();
        this.c_tableInfo.string = '房号: '+TableInfo.tablenum+'\n'+'底注: '+TableInfo.min+'\n'+'封顶: '+TableInfo.max+'\n'+'局数: '+TableInfo.gamenum;
    }
    private ClickRule(){
        switch(this.getRuleButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_RuleView.show(this.getTableInfo())};break;
        }
    }
    private ClickBackToRoom(){
        switch(this.getBackToRoomButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{SceneManager.getInstance().loadScene('room');};break;
        }
    }
    private ClickSet(){
        switch(this.getSetButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:{this.cl_SGSetViw.show();};break;
        }
    }
    private ClickChat(){
        switch(this.getChatButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }
    private ClickBiaoQin(){
        switch(this.getBiaoQinButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }
    private addEvent(){
        this.i_rule.on('touchend',this.ClickRule.bind(this));
        this.i_set.on('touchend',this.ClickSet.bind(this));
        this.i_backRomm.on('touchend',this.ClickBackToRoom.bind(this));
        this.i_chat.on('touchend',this.ClickChat.bind(this));
        this.i_biaoQin.on('touchend',this.ClickBiaoQin.bind(this));
    }
    public start(){
        this.setTableInfo();
    }
    public onDestroy(){

    }
}
