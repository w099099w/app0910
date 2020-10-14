// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import TimerStruct from "./TimerStruct";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property, menu, disallowMultiple, executeInEditMode } = cc._decorator;

cc.macro.ENABLE_WEBGL_ANTIALIAS = true;

/** UI 矩形圆角遮罩 */
@ccclass()
@disallowMultiple()   
@executeInEditMode() 
@menu('公共/倒计时冷却')

export default class CountDown extends cc.Sprite {
    private m_timeDown:TimerStruct;
    private m_timer:number;
    private m_allcount:number;
    private _countDownFinish:boolean;
    onLoad(){
        this.countDownFinish = true;
    }
    get countDownFinish(){
        return this._countDownFinish;
    }
    set countDownFinish(val:boolean){ 
        this.node.parent.getChildByName('icon').getComponent(cc.Button).interactable = val;
        this._countDownFinish = val;
    }
    /**
     * 
     * @param time 毫秒级
     */
    public show(time:number,Allcount:number = null){
        this.m_timeDown = new TimerStruct(time/1000);
        let forNum:number =  Math.floor(time/50);
        let allcount:number = Allcount === null?forNum:Allcount;
        if(Allcount === null){
            this.m_allcount = forNum;
        }
        this.fillRange = 1;
        this.countDownFinish = false;
        this.m_timer = setInterval(()=>{
            forNum -= 1;
            this.fillRange = 1*forNum/allcount;
            if(forNum == 0){
                this.fillRange = 0;
                clearInterval(this.m_timer);
                this.m_timer = null;
                this.m_timeDown = null;
                this.m_allcount = null;
                this.countDownFinish = true;
            }
        },50);
    }
    start () {
        this.fillRange = 0;
    }
    activeOn(){
        if(this.m_timeDown){
            if(this.m_timeDown.getSurPlusMilliSecond() > 0){
                this.countDownFinish = false;
                this.show(this.m_timeDown.getSurPlusMilliSecond(),this.m_allcount);
            }else{
                this.m_timeDown = null;
                this.fillRange = 0;
                this.countDownFinish = true;
            }  
        } 
    }
    activeOff(){
        if(this.m_timer){
            clearInterval(this.m_timer);
            this.m_timer = null;
        }
    }
    onDestroy() {
        if(this.m_timer){
            clearInterval(this.m_timer);
            this.m_timer = null;
            this.m_allcount = null;
        }
    }
}
