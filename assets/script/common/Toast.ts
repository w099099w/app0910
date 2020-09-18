import MyAnimation from "./MyAnimation";

export default class Toast extends MyAnimation{
    private m_root:cc.Node;
    private static m_instance:Toast;
    private isRun:boolean;
    private m_cache:ToastStruct[];
    private constructor(){
        super();
        this.m_cache = [];
    }
    public static getInstance():Toast{
        if(!Toast.m_instance){
            Toast.m_instance = new Toast();
            return Toast.m_instance;
        }
        return Toast.m_instance;
    }
    public show(str:string,root:cc.Node,isMask:boolean = false){
        this.m_cache.push(new ToastStruct(str,root,root.getChildByName('mask')));
        this.run();
    }
    public setRootNode(Node:cc.Node){
        this.m_root = Node;
    }
    public cleanData(){
        if(this.m_root.parent.active){
            this.m_root.parent.active = false;
        }
        if(this.m_root.active){
            this.m_root.active = false;
        }
        this.m_cache = [];
    }
    public run(){
        if(this.isRun || this.m_cache.length == 0){
            return;
        }
        let curToast:ToastStruct = this.m_cache.shift();
        this.isRun = true;
        this.toastFadeIn(curToast.str,curToast.root,curToast.mask,()=>{
            this.isRun = false;
            this.run();
        });
    }
}
export class ToastStruct{
    public str:string = '';
    public root:cc.Node = null;
    public mask:cc.Node = null;
    public constructor(str:string,root:cc.Node = null,Mask:cc.Node = null){
        this.str = str;
        this.root = root;
        this.mask = Mask;
    }
}