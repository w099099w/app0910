import ScrollViewRenderData from "../common/ScrollViewRenderData"
import List from "../units/List";
export default class SanGongData extends ScrollViewRenderData {
    private node:cc.Node;
    private m_mainNode:cc.Node;
    private m_mask:cc.Node;
    private m_root:cc.Node;
    private m_itemLayout:cc.Node;
    private i_back:cc.Node;
    private c_list:List;

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_mainNode = Node.getChildByName('second');
        this.m_mask = cc.find('second/mask',Node);
        this.m_root = cc.find('second/root',Node);
        this.i_back = cc.find('second/root/button_back',Node);
        this.c_list = cc.find('second/root/scrollview',Node).getComponent('List');
        this.m_itemLayout = cc.find('second/root/scrollview/view/content',Node);
        this.m_mainNode.active = false;
    }//外部主节点渲染
    public show(Number:number){
        Number = 10;
        this.removeAllChild();
        this.m_mainNode.active = true;
        this.popupOpenScaleY(this.m_root,this.m_mask,this.addEvent.bind(this));
        this.c_list.numItems = Number;
    }
    public hide(){
        this.m_mainNode.active = false;
        this.node.getChildByName('base').active = true;
        this.popupCloseScaleY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public addEvent(){
        this.node.getChildByName('base').active = false;
        this.i_back.on('touchend',this.hide.bind(this));
    }
    public hideEvent(){
        this.i_back.off('touchend');
    }
    public removeAllChild(){
        this.m_itemLayout.children.forEach((item:cc.Node)=>{
            this.c_list._delSingleItem(item)
        })
        this.m_itemLayout.removeAllChildren();
    }
    public RenderMain(Item:cc.Node,Index:number,Data:any){
        console.log('渲染低')
    }
    public RenderPopup(Item:cc.Node,Index:number,Data:any){
        console.log('渲染顶')
        cc.find('briefly/gamenum',Item).getComponent(cc.Label).string = '第'+Index+'局';
    }
    public ClickMain(Item:cc.Node,Index:number,LastId:number,Data:any){
        this.show(10);
    }
    public ClickPopup(Item:cc.Node,Index:number,LastId:number){
        this.StartRecordSgDetailRotation(cc.find('briefly/button_open',Item),Item.getChildByName('detail'),Item.getChildByName('detail').active);
    }
}