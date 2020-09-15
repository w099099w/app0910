export default class TimerStruct{
    public coutDown:number;
    public timeStamp:number;
    public constructor(CoutDown){
        this.coutDown = CoutDown;
        this.timeStamp = Date.now();
    }
    public getSurPlus():number{
        let surPlus = Date.now()-(this.timeStamp+(1000*this.coutDown))
        return surPlus > 1000? Math.floor(surPlus/1000):0;
    }
}