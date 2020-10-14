export default class TimerStruct{
    public coutDown:number;
    public timeStamp:number;
    public constructor(CoutDown){
        this.coutDown = CoutDown;
        this.timeStamp = Date.now();
    }
    public getSurPlus():number{
        let surPlus = (this.timeStamp+(1000*this.coutDown))-Date.now();
        console.log(surPlus > 1000? Math.floor(surPlus/1000):0)
        return surPlus > 1000? Math.floor(surPlus/1000):0;
    }
    public getSurPlusMilliSecond():number{
        let surPlus =(this.timeStamp+Math.floor(this.coutDown*1000)) - Date.now();
        return surPlus > 0? surPlus:0;
    }
}