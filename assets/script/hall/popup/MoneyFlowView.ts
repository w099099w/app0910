import MyAnimation from "../../common/MyAnimation";
import List from "../../units/List";
import Tool from "../../units/Tool";

export class MMoneyFlow extends MyAnimation{
    private m_cache:MoneyFlowInfo[]; 
    protected m_pageShowNum:number;
    protected readonly payTypeArr:string[];
    private _curentPage:number;
    get curentPage():number{
        return this._curentPage;
    }
    set curentPage(PageNum:number){
        if(PageNum > this.totalCount){
            cc.error('设置的当前页数超过总页数,该设置无法生效');
            return;
        }
        this._curentPage = PageNum;
    }
    private _totalCount:number;
    get totalCount():number{
        return this._totalCount;
    }
    set totalCount(PageNum:number){
        this._totalCount = PageNum;
    }
    public constructor(){
       super();
       this.m_pageShowNum = 20;
       this.payTypeArr = ["充值","提现","转账","游戏下注","游戏输赢","系统加钱","系统扣钱","退还下注"];
       this.init();
    }
    protected getMoneyFlowInfoFromIndex(Index:number):MoneyFlowInfo{
        if(Index > this.m_cache.length-1){
            return null;
        }
        return this.m_cache[Index];
    }
    public init(){
        this.curentPage = 0;
        this.totalCount = 0;
        this.m_cache = [];
    }
    public addData(Data:MoneyFlowInfo[]){
        if(!Data){
            return;
        }
        Data.forEach((Element:MoneyFlowInfo) => {
            this.m_cache.push(Element);
        });
    }
    protected RequestMoneyFlowData(callFunction:Function){
        let RequestData:MoneyFlow = {
            page:this.curentPage+1,
            limit:this.m_pageShowNum,
        };
        this.totalCount = 73;
        let forNum = RequestData.page*RequestData.limit > this.totalCount?this.totalCount%this.m_pageShowNum:this.m_pageShowNum;
        console.log(RequestData.page,RequestData.limit,this.totalCount,forNum);
        for(let i = 0; i < forNum;i++){
            let as = Math.ceil(Math.random()*100000);
            let amounti = (Math.random()*10)>5?Math.ceil(Math.random()*(as/0.4)):-Math.ceil(Math.random()*(as/0.4));
            let afteri = as+amounti;
            let temp:MoneyFlowInfo = {
                orderid:(Date.now()+(this.curentPage*this.m_pageShowNum+i)*8000).toString(16)+(Date.now()+(this.curentPage*this.m_pageShowNum+i)*8000).toString(16),
                before:as,
                amount:amounti,
                after:afteri,
                type:Math.ceil(Math.random()*7),
                date:Tool.getInstance().getCurentTime(Date.now()+(this.curentPage*this.m_pageShowNum+i)*8000)
            }
            this.m_cache.push(temp);
        };
        this.curentPage+=1;
        callFunction(this.m_cache.length);
    }
}


export default class MoneyFlowView extends MMoneyFlow{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_mainRoot:cc.Node;
    private m_itemLayout:cc.Node;
    private m_scrollview:cc.Node;
    private m_noneData:cc.Node;
    private i_back:cc.Node;

    private c_list:List;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/moneyflow/mask',this.node);
        this.m_root = cc.find('popup/moneyflow/root',this.node);
        this.m_mainRoot = cc.find('popup/moneyflow',this.node);
        this.m_itemLayout = cc.find('popup/moneyflow/root/scrollview/view/content',this.node);
        this.m_noneData = cc.find('popup/moneyflow/root/none',this.node);
        this.m_scrollview = cc.find('popup/moneyflow/root/scrollview',this.node);

        this.i_back = cc.find('popup/moneyflow/root/button_back',this.node);

        this.c_list = cc.find('popup/moneyflow/root/scrollview',this.node).getComponent('List');
        this.removeAllChild();
        this.m_mainRoot.active = true;
    }
    public removeAllChild(){
        this.m_itemLayout.children.forEach((item:cc.Node)=>{
            this.c_list._delSingleItem(item)
        })
        this.c_list.numItems = 0;
    }
    public show(){
        this.removeAllChild();
        this.RequestMoneyFlowData(this.addItemNumber.bind(this));
        this.popupOpenScaleY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }
    public addItemNumber(DataNumber:number){
        this.c_list.numItems = DataNumber;
        this.m_noneData.active = DataNumber === 0;
    }
    public scrollToButtom(){
        if(Math.ceil(this.totalCount/this.m_pageShowNum) === this.curentPage || this.totalCount === 0){
            return;
        }
        this.RequestMoneyFlowData(this.addItemNumber.bind(this));
    }
    public hide(){
        this.init();
        this.popupCloseScaleY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public hideEvent(){
        this.i_back.off('touchend');
        this.m_scrollview.off('scroll-to-bottom');
    }
    public addEvent(){
       this.i_back.on('touchend',this.hide.bind(this));
       this.m_scrollview.on('scroll-to-bottom',this.scrollToButtom.bind(this));
    }
    public renderMoneyFlowFunction(Item:cc.Node,Index:number){
        console.log(Index);
        let data:MoneyFlowInfo = this.getMoneyFlowInfoFromIndex(Index);
        
        Item.getChildByName('orderid').getComponent(cc.Label).string = data.orderid;
        Item.getChildByName('before').getComponent(cc.Label).string = String(data.before);
        Item.getChildByName('amount').getComponent(cc.Label).string = String(data.amount);
        if(data.amount > 0){
            Item.getChildByName('amount').color = new cc.Color(255,0,0);
        }else if(data.amount < 0){
            Item.getChildByName('amount').color = new cc.Color(0,255,0);
        }else{
            Item.getChildByName('amount').color = new cc.Color(255,255,255);
        }
        Item.getChildByName('after').getComponent(cc.Label).string = String(data.after);
        Item.getChildByName('type').getComponent(cc.Label).string = this.payTypeArr[data.type];
        Item.getChildByName('date').getComponent(cc.Label).string = data.date;
    }
    public start(){
        this.m_mainRoot.active = false;
    }
    public onDestory(){
       
    }
}