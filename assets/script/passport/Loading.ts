import SceneManager from '../common/SceneManager'
import FlashLightUBO from '../common/FlashLightUBO'

export default class Loading{
    private m_Tween:cc.Tween;
    private node:cc.Node;
    private t_timerMovex:number;
    private t_timerLoading:number;
    private m_flashLightAppName:cc.Node; 
    private m_loadingBar:cc.ProgressBar;
    private m_loadingContent:cc.Label;
    private m_loadingDetail:cc.Label;
    private m_rootNode:cc.Node;
    private m_star:cc.Node;
    private shader_flashLightUBO: FlashLightUBO = new FlashLightUBO();
    private f_lauchingFinishCallBack:Function;
    public constructor(Node:cc.Node,lauchingFinishCallBack:Function){
        this.node = Node;
        this.m_flashLightAppName = cc.find('logo/appname',this.node);
        this.m_loadingBar = cc.find('loading/progress',this.node).getComponent(cc.ProgressBar);
        this.m_loadingDetail = cc.find('loading/progress/state/detail',this.node).getComponent(cc.Label);
        this.m_loadingContent = cc.find('loading/progress/state/content',this.node).getComponent(cc.Label);
        this.m_star = cc.find('logo/star',this.node);
        this.m_rootNode = cc.find('loading',this.node);
        this.f_lauchingFinishCallBack = lauchingFinishCallBack;
        this.m_rootNode.active = true;
    }
    public hide(){
        this.m_rootNode.active = false;
    }
    public Startlauching(){
        cc.find('loading',this.node).active = true;
        this.m_loadingContent.string = '加载中...';
        SceneManager.getInstance().preloadScene((progress)=>{
            let pro:string = '0%';
            if(progress !== 100){
                pro = Math.ceil(progress) + "%";
            }else{
                pro = '100%';
            }
            this.m_loadingBar.progress = progress/100;
            this.m_loadingDetail.string = pro;
            if(progress === 100){
                this.m_loadingContent.string = '加载完成';
                this.t_timerLoading = setTimeout(()=>{
                    cc.tween(this.m_rootNode).to(0.2,{scaleY:0},{easing:'quadOut'}).call(()=>{
                        this.m_rootNode.active = false;
                        if(this.f_lauchingFinishCallBack){
                            this.f_lauchingFinishCallBack();
                        }
                    }).start();
                    this.t_timerLoading = null;
                },1000);
            }
        });
    }
    public runShader(){
         //shader常量
         this.shader_flashLightUBO.lightAngle = 75;
         this.shader_flashLightUBO.lightColor = cc.color(130,99,68);
         this.shader_flashLightUBO.lightWidth = 0.05;
         this.shader_flashLightUBO.enableGradient = true;
         this.shader_flashLightUBO.cropAlpha = true;
         this.shader_flashLightUBO.enableFog = false;
         //扫光
         let posx = 0;
         this.t_timerMovex = setInterval(()=>{
             //shader变量
             this.shader_flashLightUBO.lightCenterPoint = cc.v2(posx+=0.02, 0.5);
             //设置材质
             let material: cc.Material = this.m_flashLightAppName.getComponent(cc.Sprite).getMaterial(0);
             material.setProperty("lightColor", this.shader_flashLightUBO.lightColor);
             material.setProperty("lightCenterPoint", this.shader_flashLightUBO.lightCenterPoint);
             material.setProperty("lightAngle", this.shader_flashLightUBO.lightAngle);
             material.setProperty("lightWidth", this.shader_flashLightUBO.lightWidth);
             material.setProperty("enableGradient", this.shader_flashLightUBO.enableGradient);
             material.setProperty("cropAlpha", this.shader_flashLightUBO.cropAlpha);
             material.setProperty("enableFog", this.shader_flashLightUBO.enableFog);
             this.m_flashLightAppName.getComponent(cc.Sprite).setMaterial(0, material);
             if(posx > 1){
                 posx = 0;
             }
         },33);
         //this.m_Tween = cc.tween(this.m_star).repeatForever(cc.tween().to(1,{opacity:0},{easing:'quadOut'}).to(1,{opacity:255},{easing:'quadIn'})).start();
    }
    public onDestory(){
        if(this.t_timerMovex){
            clearInterval(this.t_timerMovex);
            this.t_timerMovex = null;
        }
        if(this.t_timerLoading){
            clearTimeout(this.t_timerLoading);
            this.t_timerLoading = null;
        }
        //this.m_Tween.stop();
    }
    // update (dt) {}
}
