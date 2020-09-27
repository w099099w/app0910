import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";

export class MPlay extends MyAnimation{
    private m_cache:PlayInfo[];

    public constructor(){
       super();
       this.m_cache = [];
    }

    public getPlayNum(){
        return this.m_cache.length;
    }
    public getPlayInfoFromIndex(Index:number):PlayInfo{
        if(Index > this.m_cache.length - 1){
            return null;
        }
        return this.m_cache[Index];
    }
    public getForeach(foreachPlayInfo:ForeachPlayInfo){
        this.m_cache.forEach((item,key)=>{
            foreachPlayInfo(item.tittle,item.contentUrl,key);
        })
    }
    public requestPlayData(CallBack:Function = null){
        this.m_cache.push({tittle:'测试',contentUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2865588960,3182946800&fm=26&gp=0.jpg'});
        this.m_cache.push({tittle:'数据',contentUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2549460017,2289431805&fm=26&gp=0.jpg'});
        this.m_cache.push({tittle:'Other',contentUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1526579720,3267137196&fm=26&gp=0.jpg'});
        CallBack();
    }
}


export default class PlayView extends MPlay{
    private node:cc.Node;
    private m_toast:cc.Node;

    private m_curentKey:number;
    
    private m_root:cc.Node;
    private m_mask:cc.Node;
    private m_noneData:cc.Node;
    private m_chooseLayout:cc.Node[];
    private m_chooseRoot:cc.Node;
    private m_scrollviewRoot:cc.Node;
    private m_viewSprite:cc.Node;

    private i_close:cc.Node;

    private p_buttonPrefab:cc.Prefab;

    public constructor(Node:cc.Node,ButtonPrefab:cc.Prefab){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);

        this.m_curentKey = -1;

        this.m_root = cc.find('popup/play', this.node);
        this.m_mask = cc.find('popup/mask', this.node);

        this.m_noneData = cc.find('popup/play/layout/nonedata',this.node);
        this.m_chooseLayout = cc.find('popup/play/layout/choose/layout',this.node).children;
        this.m_chooseRoot = cc.find('popup/play/layout/choose',this.node);
        this.m_scrollviewRoot = cc.find('popup/play/layout/scrollview',this.node);
        this.m_viewSprite = cc.find('popup/play/layout/scrollview/view/content/item',this.node);

        this.i_close = cc.find('popup/play/button_close',this.node);
        this.m_chooseRoot.getChildByName('layout').removeAllChildren();
        this.p_buttonPrefab = ButtonPrefab;
        this.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
        this.m_root.active = false;
    }
    private setLeftButtonInfo(Node:cc.Node,Name:string){
        Node.getChildByName('value').getComponent(cc.Label).string = Name;
        Node.getChildByName('bg').getChildByName('value').getComponent(cc.Label).string = Name;
    }
    private setView(){
        this.getForeach((tittle,Url,Index)=>{
            let newNode:cc.Node = cc.instantiate(this.p_buttonPrefab);
            this.setLeftButtonInfo(newNode,tittle);
            this.m_chooseRoot.getChildByName('layout').addChild(newNode);
        });
    }
    public show(){
        this.m_chooseRoot.active = this.m_scrollviewRoot.active = !(this.m_noneData.active = this.getPlayNum() === 0?true:false);
        this.popupOpenScaleXY(this.m_root,this.m_mask);
        this.UpdateView(this.getPlayNum() == 0?-1:0);
        this.addEvent();
    }
    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,()=>{
            this.hideEvent();
            this.m_curentKey = -1;
            this.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
        });
    }
    public UpdateView(key:number){
        if(key === -1 || key === this.m_curentKey){
            return;
        }
        this.m_curentKey = key;
        this.m_viewSprite.parent.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        this.m_viewSprite.getComponent(cc.Sprite).spriteFrame = null;
        this.m_chooseLayout.forEach((item,index)=>{
            item.getChildByName('value').active = !(index === key);
            item.getChildByName('bg').active = index === key;
            if(key === index){
                Tool.getInstance().LoadImageRemote(this.m_viewSprite,this.getPlayInfoFromIndex(index).contentUrl);
            }
        },this);
    }
    private addEvent(){
        this.i_close.on('touchend',()=>{
            this.hide();
        },this);
        this.m_chooseLayout.forEach((item,key)=>{
            item.on('touchend',()=>{
                this.UpdateView(key);
            },this);
        })
    }
    public hideEvent(){
        this.i_close.off('touchend');
        this.m_chooseLayout.forEach((item,key)=>{
            item.off('touchend');
        })
    }
    public start(){
        this.requestPlayData(this.setView.bind(this));
    }
    public onDestory(){
        
    }
}

