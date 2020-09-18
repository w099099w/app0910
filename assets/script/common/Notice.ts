import MyAnimation from "./MyAnimation";

export default class Notice extends MyAnimation{
    private m_root:cc.Node;
    private m_bgNode:cc.Node;
    private m_labelNode:cc.Node;
    private m_moveSpeed:number;
    private m_isLoop:boolean;
    private m_runFlag:number;
    private static m_instance:Notice;
    private isRun:boolean;
    private m_cache:string[];
    private m_debug:boolean;

    private constructor(RootNode:cc.Node = null){
        super();
        this.m_debug = false;
        this.isRun = false;
        this.m_isLoop = true;
        this.m_moveSpeed = 10;
        this.m_runFlag = -1;
        this.m_cache = [];
        this.hide();
        if(RootNode){
            this.setRootNode(RootNode);
        }
    }
    public setSpeed(Speed:number){
        this.m_moveSpeed = Speed;
    }
    public static getInstance(RootNode:cc.Node = null):Notice{
        if(!Notice.m_instance){
            Notice.m_instance = new Notice(RootNode);
            return Notice.m_instance;
        }
        return Notice.m_instance;
    }
    public addText(str:string){
        if(this.m_debug){
            this.m_cache[0] = '通知配置信息: 循环模式'+(this.m_isLoop?'ON':'OFF ')+'当前缓存信息数量:'+this.m_cache.length+'当前移动配速: '+this.m_moveSpeed;
        }
        this.m_cache.push(str);
        this.show();
    }
    private hide(){
        cc.tween(this.m_root).delay(0.5).to(0.3,{opacity:0},{easing:'quadOut'}).call(()=>{
            if(cc.isValid(this.m_root)){
                this.m_root.active = false;
                this.show();//在检查一次还有没有空
            }
        }).start();
    }
    public debug(){
        this.m_debug = true;
        this.addText('DESIGNED BY COCOS COREATOR 2.4.3-RC7 ©2020 XIAMEN YAJI PROGECTNAME:APP0910 PACKAGENAME:COM.MEIJI.GALM');
    }
    private show(){
        if(this.isRun){
            return;
        }else if(this.m_cache.length == 0){
            this.hide();
            return;
        }
        let str:string;
        if(this.m_isLoop){
            this.m_runFlag += 1;
            if(this.m_runFlag > this.m_cache.length-1){
                this.m_runFlag = 0;
            }
         
            str = this.m_cache[this.m_runFlag];
            console.log(str);
        }else{
            this.m_runFlag = -1;
            str = this.m_cache.shift();
        }
        this.run(str);
    }
    public setRootNode(Node:cc.Node){
        this.m_root = Node;
        this.m_bgNode = cc.find('bg',this.m_root);
        this.m_labelNode = cc.find('bg/mask/value',this.m_root);
    }
    public cleanData(){
        this.m_cache = [];
    }
    private run(str:string){
        this.isRun = true;//标记运行状态
        this.m_labelNode.getComponent(cc.Label).string = str;
        this.m_labelNode.x = this.m_bgNode.width+30;
        this.m_root.active = true;
        this.m_labelNode.active = true;
        this.m_labelNode.getComponent(cc.Label)._forceUpdateRenderData();
        let LabelWidth:number = this.m_labelNode.width;
        let MoveLength:number = this.m_bgNode.width+LabelWidth+30;
        let StartPos = this.m_labelNode.x;
        let RunTween:cc.Tween = cc.tween(this.m_labelNode).by((MoveLength/(this.m_moveSpeed*10)),{x:-MoveLength},{easing:'linear'}).call(()=>{
            this.isRun = false;
            this.show();
        }).start();
    }   
}