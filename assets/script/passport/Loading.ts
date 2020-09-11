import SceneManager from '../units/SceneManager'
import FlashLightUBO from '../units/FlashLightUBO'
export default class Loading{
    private node:cc.Node;
    private m_flashLightAppName:cc.Node; 
    private m_loadingBar:cc.ProgressBar;
    private m_loadingContent:cc.Label;
    private m_loadingDetail:cc.Label;
    private m_rootNode:cc.Node;
    private shader_flashLightUBO: FlashLightUBO = new FlashLightUBO();
    private f_lauchingFinishCallBack:Function;
    public constructor(Node:cc.Node,lauchingFinishCallBack:Function){
        this.node = Node;
        this.m_flashLightAppName = cc.find('loading/logo/appname',this.node);
        this.m_loadingBar = cc.find('loading/progress',this.node).getComponent(cc.ProgressBar);
        this.m_loadingDetail = cc.find('loading/progress/state/detail',this.node).getComponent(cc.Label);
        this.m_loadingContent = cc.find('loading/progress/state/content',this.node).getComponent(cc.Label);
        this.m_rootNode = cc.find('loading',this.node);
        this.f_lauchingFinishCallBack = lauchingFinishCallBack;
        this.m_rootNode.active = true;
    }
    public Startlauching(){
        //shader常量
        this.shader_flashLightUBO.lightAngle = 75;
        this.shader_flashLightUBO.lightColor = cc.color(130,99,68);
        this.shader_flashLightUBO.lightWidth = 0.1;
        this.shader_flashLightUBO.enableGradient = true;
        this.shader_flashLightUBO.cropAlpha = true;
        this.shader_flashLightUBO.enableFog = false;
        //扫光
        let posx = 0;
        let time_movex = setInterval(()=>{
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
        //加载条
        let bar = 0;
        let timer_loading = setInterval(()=>{
            bar+=0.01;
            let index = (bar*100).toString().indexOf('.');
            let pro = (bar*100).toString().slice(0, index) + "%";
            this.m_loadingBar.progress = bar;
            this.m_loadingDetail.string = pro;
            if(bar > 1){
                clearInterval(timer_loading);
                this.m_loadingContent.string = '加载完成';
                setTimeout(()=>{
                    clearInterval(time_movex);
                    cc.tween(this.m_rootNode).to(0.2,{scaleY:0},{easing:'quadOut'}).call(()=>{
                        this.m_rootNode.active = false;
                        if(this.f_lauchingFinishCallBack){
                            this.f_lauchingFinishCallBack();
                        }
                    }).start();
                },3000);
            }
        },33);
    }

    // update (dt) {}
}
