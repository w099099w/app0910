export default class Load{
    private node:cc.Node;
    private m_root:cc.Node;
    private static m_instance:Load;
    private m_tween:cc.Tween;
    private c_label:cc.Label;
    private m_icon:cc.Node;
    private m_mask:cc.Node;

    public static getInstance():Load{
        if(!Load.m_instance){
            Load.m_instance = new Load();
            return Load.m_instance;
        }
        return Load.m_instance;
    }
    public show(str:string,isMask:boolean){
        if(str){
            this.c_label.string = str;
        }
        if(isMask){
            this.m_mask.active = true;
        }
        this.m_root.parent.active = true;
        this.m_root.active = true;
        this.m_tween = cc.tween(this.m_icon).repeatForever(cc.tween().by(1,{angle:360})).start();
    }
    public hide(){
        this.m_tween.stop();
        this.m_root.active = false;
    }
    public setRootNode(Node:cc.Node){
        this.m_root = Node;
        this.m_mask = cc.find('mask',this.m_root);
        this.c_label = cc.find('layout/label',this.m_root).getComponent(cc.Label);
        this.m_icon = cc.find('layout/load',this.m_root);
    }
    public onDestroy(){
        this.m_tween.stop();
    }
}
