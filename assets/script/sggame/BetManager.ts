// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetManager extends cc.Component {

    @property(cc.Node)
    slider:cc.Node = null;
    @property(cc.Node)
    bar:cc.Node = null;
    @property(cc.Label)
    min:cc.Label = null;
    @property(cc.Label)
    max:cc.Label = null;
    @property(cc.Label)
    bet:cc.Label = null;
    private _minValue:number;
    get minValue():number{
        return this._minValue;
    }
    set minValue(val:number){
        this._minValue = val;
        this.min.string = '底注: '+val;
    } 
    private _maxValue:number;
    get maxValue():number{
        return this._maxValue;
    }
    set maxValue(val:number){
        this._maxValue = val;
        this.max.string = '封顶: '+val;
    }
    public _betValue:number;
    get betValue():number{
        return this._betValue;
    }
    set betValue(val:number){
        this._betValue = Math.floor(val);
        this.bet.string = '下注: '+this._betValue;
        let progress:number = (this._betValue-this.minValue)/(this.maxValue-this.minValue);
        this.bar.width = progress*this.barWidth;
        this.slider.getComponent(cc.Slider).progress = progress;
    }

    private barWidth:number;
    onLoad(){
        this.barWidth = this.bar.width;
    }
    start () {
        this.show(500,2500,1000);
    }
    public show(minValue:number,maxValue:number,showValue:number = null){
        this.setBetNumber(minValue,maxValue,showValue);
        this.addEvent();
    }
    private setBetNumber(minValue:number,maxValue:number,showValue:number = null){
        this.minValue = minValue;
        this.maxValue = maxValue;
        if(showValue || showValue === 0){
            this.betValue = showValue;
        }else{
            this.betValue = this.minValue;
        }
    }
    public setView(){
        let progress:number = this.slider.getComponent(cc.Slider).progress;
        this.betValue = (this.maxValue-this.minValue)*progress+this.minValue;
    }
    public addEvent(){
        this.slider.on('slide',()=>{
            this.setView();
        });
    }
    // update (dt) {}
}
