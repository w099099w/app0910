import Emitter from "../common/Emitter";
import Notice from "../common/Notice";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import EmitterCode from "../units/EmitterCode";
import ControllerManager from "./controller/ControllerManager";
import ModelManager from "./model/ModelManager";
import VHome from "./view/VHome";
import VLeft from "./view/VLeft";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallViewManager extends cc.Component {

    private cl_modelManager:ModelManager;
    private cl_controllerManager:ControllerManager;
    
    private m_vhome:VHome;
    private m_vleft:VLeft;

    onLoad () {
        
        //设置场景
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        Notice.getInstance().setRootNode(cc.find('top/notice',this.node));
        Notice.getInstance().debug();

        //初始化管理工具
        this.cl_modelManager = ModelManager.getInstance();
        this.cl_controllerManager = ControllerManager.getInstance();

        //设置自己负责的视图组件
        this.m_vhome = new VHome(this.node,this.cl_modelManager);
        this.m_vleft = new VLeft(this.node,this.cl_modelManager);
        //注册事件监听;
        this.addEmitter();
        
        
    }
    onback(){
        SceneManager.getInstance().loadScene('passport');
    }
    start(){
        this.cl_controllerManager.start();
    }
    public addEmitter(){
        let self:HallViewManager = this;
        //粒子动画事件
        Emitter.register(EmitterCode.MODE_HOMESTARTPARTICLE,self.m_vhome.runParticleRender,self.m_vhome);
        Emitter.register(EmitterCode.MODE_HOMECLICKDLM,self.m_vhome.click_DLM,self.m_vhome);
        Emitter.register(EmitterCode.MODE_HOMECLICKJLB,self.m_vhome.click_JLB,self.m_vhome);
        Emitter.register(EmitterCode.MODE_HOMECLICKCTM,self.m_vhome.click_CTM,self.m_vhome);
        Emitter.register(EmitterCode.MODE_LEFTCLICKJOINROOM,self.m_vleft.click_JoinRoom,self.m_vleft);
        Emitter.register(EmitterCode.MODE_LEFTCLICKOPENDROOM,self.m_vleft.click_OpendRoom,self.m_vleft);

    }
}
