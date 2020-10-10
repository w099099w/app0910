import MyAnimation from "./MyAnimation";

export default class Dialog extends MyAnimation{
    private parent:cc.Node;
    private rootNode:cc.Node;
    private root:cc.Node;
    private mask:cc.Node;
    private tittle:cc.Label;
    private icon:any;
    private label:cc.Label;
    private button_yes:cc.Node;
    private button_no:cc.Node;
    private queenData:any[];
    private m_root:cc.Node;
    private static m_instance:Dialog;
    private isRun:boolean;
    private curBuStyle:DIALOG;
    private curParms:any;
    private unlock:boolean;
    private curCallBack:Function;
    private constructor(){
        super();
        this.queenData = [];
    }
    public static getInstance():Dialog{
        if(!Dialog.m_instance){
            Dialog.m_instance = new Dialog();
            return Dialog.m_instance;
        }
        return Dialog.m_instance;
    }
    public setRootNode(Node:cc.Node){
        this.m_root = Node;
        this.parent = cc.find('common',Node),
        this.rootNode = cc.find('common/dialog',Node),
        this.root = cc.find('common/dialog/root',Node),
        this.mask = cc.find('common/dialog/mask',Node),
        this.tittle = cc.find('common/dialog/root/tittle',Node).getComponent(cc.Label),
        this.icon = cc.find('common/dialog/root/content/icon',Node).getComponent('switchsp'),
        this.label = cc.find('common/dialog/root/content/value',Node).getComponent(cc.Label),
        this.button_yes = cc.find('common/dialog/root/button_layout/button_confirm',Node),
        this.button_no = cc.find('common/dialog/root/button_layout/button_cancle',Node),
        this.reset();
        this.addEvent();
    }
    public cleanData(){
        if(this.m_root.parent.active){
            this.m_root.parent.active = false;
        }
        if(this.m_root.active){
            this.m_root.active = false;
        }
        this.queenData = [];
    }
   
    private reset(){
        this.label.fontSize = 30;
        this.label.lineHeight = 30;
        this.root.scaleY = 0;
        this.parent.active = true;
        this.mask.active = false;
        this.root.active = false;
        this.icon.setSpriteFrame(-1);
        this.label.string = '';
        this.tittle.string = '';
        this.button_no.active = false;
        this.button_yes.active = false;
        this.queenData = [];
        this.unlock = true;
    }
    public push(tittle,iconID,label,buttonStyle,callback,parms){
        if(typeof tittle === 'string' && typeof iconID === 'number' && typeof label === 'string' && typeof buttonStyle === 'number'){
            let calclabel = '';
            for(let i = 0; i < label.length;++i){
                switch(i){
                    case 17:
                    case 32:
                    case 45:
                    case 56:calclabel+=label[i];calclabel+='\n';break;//换行
                    case 62:calclabel+='...';i=label.length;break;//长度限制
                    default:calclabel+=label[i];
                }
            }
            this.queenData.push({
                tittle:tittle,
                label:calclabel,
                iconID:iconID,
                buttonStyle:buttonStyle,
                callback:callback,
                parms:parms
            });
            this.show();
        }
    }
    private show(){
        if(this.unlock){
            this.unlock = false;//上锁
            this.rootNode.active = true;
            let curData = this.queenData.shift();
            if(curData){
                this.curBuStyle = curData.buttonStyle;
                this.curCallBack = curData.callback;
                this.curParms = curData.parms;
                this.tittle.string = curData.tittle;
                this.label.string = curData.label;
                this.icon.setSpriteFrame(curData.iconID);
                if(curData.iconID == -1 ){
                    this.icon.node.width = this.icon.node.height = 0;
                }
                switch(this.curBuStyle){
                    case DIALOG.MB_YES:this.button_yes.active = true;break;
                    case DIALOG.MB_YESNO:this.button_yes.active = true;this.button_no.active = true;break;
                }
                this.popupOpenScaleXY(this.root,this.mask);
            } 
        }
    }
    private hide(){
        this.popupCloseScaleXY(this.root,this.mask,()=>{
            this.icon.setSpriteFrame(-1);
            this.label.string = '';
            this.tittle.string = '';
            this.button_no.active = false;
            this.button_yes.active = false;
            this.root.active = false;
            this.curBuStyle = null;
            this.curCallBack = null;
            this.curParms = null;
            this.unlock = true;//解锁
            if(this.queenData.length === 0){
                this.mask.active = false;
                this.rootNode.active = true;
            }else{
                this.show();
            }
        });
    }
    private result(touchCode){
        if(this.curCallBack){
            if(this.curBuStyle === DIALOG.MB_YESNO){
                switch(touchCode){
                    case DIALOG.MB_YES:
                    case DIALOG.MB_NO:this.curCallBack({ctrl:touchCode,params:this.curParms});break;
                }
            }else if(this.curBuStyle === DIALOG.MB_NO && touchCode === DIALOG.MB_NO){
                this.curCallBack({ctrl:touchCode,params:this.curParms})
            }else if(this.curBuStyle === DIALOG.MB_YES && touchCode === DIALOG.MB_YES){
                this.curCallBack({ctrl:touchCode,params:this.curParms})
            }
        }
        this.hide(); 
    }
    private addEvent(){
        this.button_yes.on('touchend',()=>{
            this.result(DIALOG.MB_YES);
        },this);
        this.button_no.on('touchend',()=>{
            this.result(DIALOG.MB_NO);
        },this);
    }
}
