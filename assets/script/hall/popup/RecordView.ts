import MyAnimation from "../../common/MyAnimation";
import ScrollViewRenderData from "../../common/ScrollViewRenderData";
import SanGongData from "../../scrollviewData/SanGongData";
import List from "../../units/List";
import Tool from "../../units/Tool";

export class MRecord extends MyAnimation{
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
    protected getDataFromIndex(Index:number):any{
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
        this.totalCount = 10;
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


export default class RecordView extends MRecord{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_mainNode:cc.Node;
    private m_itemLayout:cc.Node;
    private m_scrollview:cc.Node;
    private m_noneData:cc.Node;
    private i_close:cc.Node;

    private c_list:List;
    private m_prefab:cc.Prefab;
    private p_renderData:ScrollViewRenderData;

    public constructor(Node:cc.Node,Prefab:cc.Prefab){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mainNode = cc.find('popup/record',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root = cc.find('popup/record/base',this.node);
        this.m_itemLayout = cc.find('popup/record/base/scrollview/view/content',this.node);
        this.m_noneData = cc.find('popup/record/base/none',this.node);
        this.m_scrollview = cc.find('popup/record/base/scrollview',this.node);

        this.i_close = cc.find('popup/record/base/button_close',this.node);

        this.c_list = cc.find('popup/record/base/scrollview',this.node).getComponent('List');
        this.m_prefab = Prefab;
        this.p_renderData = new SanGongData(cc.find('popup/record',this.node));
        this.m_mainNode.active = true;
        this.m_root.active = true;
    }
    public removeAllChild(ChooseView:number){
        this.m_itemLayout.children.forEach((item:cc.Node)=>{
            this.c_list._delSingleItem(item)
        })
        this.m_itemLayout.removeAllChildren();
        this.c_list.PrefabIndex = ChooseView;
        this.init();
    }
    public show(){
        this.m_mainNode.active = true;
        this.removeAllChild(0);
        this.RequestMoneyFlowData(this.addItemNumber.bind(this));
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
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
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public hideEvent(){
        this.i_close.off('touchend');
        this.m_scrollview.off('scroll-to-bottom');
        this.m_mainNode.active = false;
    }
    public addEvent(){
       this.i_close.on('touchend',this.hide.bind(this));
       this.m_scrollview.on('scroll-to-bottom',this.scrollToButtom.bind(this));
    }
    public start(){
        this.m_root.active = false;
        this.m_mainNode.active = false;
    }
    //多态
    public clickMainItemFunction(Item:cc.Node,Index:number,LastId:number){
        this.p_renderData.ClickMain(Item,Index,LastId,this.getDataFromIndex(Index));
    }
    public clickPopupItemFunction(Item:cc.Node,Index:number,LastId:number){
        this.p_renderData.ClickPopup(Item,Index,LastId,this.getDataFromIndex(Index));
    }
    public RenderMainFunction(Item:cc.Node,Index:number){
        this.p_renderData.RenderMain(Item,Index,this.getDataFromIndex(Index));
    }
    public RenderPopupFunction(Item:cc.Node,Index:number){
        this.p_renderData.RenderPopup(Item,Index,this.getDataFromIndex(Index));
    }
    public onDestory(){
       
    }
}