import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";

enum BUTTON_STATE{
    OFF,
    ON
}

interface msgInfo{
    tittle:string;
    content:string;
}
interface foreachMsgInfo{
    (Tittle:string,contentUrl:string,Index:number):any;
}

export class MMsg extends MyAnimation{
    private m_cache:msgInfo[];

    public constructor(){
       super();
       this.m_cache = [];
    }

    public getMsgNum(){
        return this.m_cache.length;
    }
    public getMsgInfoFromIndex(Index:number):msgInfo{
        if(Index > this.m_cache.length - 1){
            return null;
        }
        return this.m_cache[Index];
    }
    public getForeach(foreachMsgInfo:foreachMsgInfo){
        this.m_cache.forEach((item,key)=>{
            foreachMsgInfo(item.tittle,item.content,key);
        })
    }
    public requestMessageData(CallBack:Function = null){
        this.m_cache.push({tittle:'版本信息',content:'appName:港澳联盟\n版本Ver:1.0.0.0\nDESIGNED BY COCOS COREATOR 2.4.3-RC7 ©2020 XIAMEN YAJI \nPROGECTNAME:APP0910 PACKAGENAME:COM.MEIJI.GALM'});
        this.m_cache.push({tittle:'当前时间',content:'本次请求时间: '+Tool.getInstance().getCurentTime()});
        CallBack();
    }
}


export default class MsgView extends MMsg{
    private node:cc.Node;
    private m_toast:cc.Node;

    private m_curentKey:number;
    
    private m_root:cc.Node;
    private m_mask:cc.Node;
    private m_noneData:cc.Node;
    private m_chooseLayout:cc.Node[];
    private m_chooseRoot:cc.Node;
    private m_scrollviewRoot:cc.Node;
    private m_viewLabel:cc.Label;

    private i_close:cc.Node;

    private p_buttonPrefab:cc.Prefab;

    public constructor(Node:cc.Node,ButtonPrefab:cc.Prefab){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);

        this.m_curentKey = -1;

        this.m_root = cc.find('popup/message', this.node);
        this.m_mask = cc.find('popup/mask', this.node);

        this.m_noneData = cc.find('popup/message/layout/nonedata',this.node);
        this.m_chooseLayout = cc.find('popup/message/layout/choose/layout',this.node).children;
        this.m_chooseRoot = cc.find('popup/message/layout/choose',this.node);
        this.m_scrollviewRoot = cc.find('popup/message/layout/scrollview',this.node);
        this.m_viewLabel = cc.find('popup/message/layout/scrollview/view/content/item',this.node).getComponent(cc.Label);

        this.i_close = cc.find('popup/message/button_close',this.node);
        this.m_chooseRoot.getChildByName('layout').removeAllChildren();
        this.p_buttonPrefab = ButtonPrefab;
        this.m_viewLabel.string = null;
        this.m_root.active = false;
    }
    private setLeftButtonInfo(Node:cc.Node,Name:string){
        Node.getChildByName('value').getComponent(cc.Label).string = Name;
        Node.getChildByName('bg').getChildByName('value').getComponent(cc.Label).string = Name;
    }
    private setView(){
        this.getForeach((tittle,content,Index)=>{
            let newNode:cc.Node = cc.instantiate(this.p_buttonPrefab);
            this.setLeftButtonInfo(newNode,tittle);
            this.m_chooseRoot.getChildByName('layout').addChild(newNode);
        });
    }
    public show(){
        this.m_chooseRoot.active = this.m_scrollviewRoot.active = !(this.m_noneData.active = this.getMsgNum() === 0?true:false);
        this.popupOpenScaleY(this.m_root,this.m_mask);
        this.UpdateView(this.getMsgNum() == 0?-1:0);
        this.addEvent();
    }
    public hide(){
        this.popupCloseScaleY(this.m_root,this.m_mask,()=>{
            this.hideEvent();
            this.m_curentKey = -1;
            this.m_viewLabel.getComponent(cc.Label).string = '';
        });
    }
    public UpdateView(key:number){
        if(key === -1 || key === this.m_curentKey){
            return;
        }
        this.m_curentKey = key;
        this.m_chooseLayout.forEach((item,index)=>{
            item.getChildByName('value').active = !(index === key);
            item.getChildByName('bg').active = index === key;
            if(key === index){
                this.m_viewLabel.string = this.getMsgInfoFromIndex(index).content;
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
        this.requestMessageData(this.setView.bind(this));
    }
    public onDestory(){
        
    }
}

