import ModelManager from "../model/ModelManager";
import CHome from "../controller/CHome";
import Emitter from "../../common/Emitter";
import CLeft from "../controller/CLeft";
import EmitterCode from "../../units/EmitterCode";

export default class ControllerManager {
    private cl_ModelManager:ModelManager;
    private cl_CHome:CHome;
    private cl_CLeft:CLeft;
    private static m_instance:ControllerManager;
    private constructor(){
        this.cl_ModelManager = ModelManager.getInstance();
        this.createAllModel();
        this.addEmitter();
    }
    public static getInstance(){
        if(!ControllerManager.m_instance){
            ControllerManager.m_instance = new ControllerManager();
            return ControllerManager.m_instance;
        }
        return ControllerManager.m_instance;
    }
    
    private createAllModel(){
        this.cl_CHome = new CHome();
        this.cl_CLeft = new CLeft();
    }
    public start(){
        this.cl_CHome.start();
    }
    
    public getModelManager():ModelManager{
        return this.cl_ModelManager;
    }

    public getController_CHome():CHome{
        return this.cl_CHome;
    }
    public getController_CLeft():CLeft{
        return this.cl_CLeft;
    }  

    public addEmitter(){
        let self:ControllerManager = this;
        //粒子动画事件
        Emitter.register(EmitterCode.CTRL_HOMEDLMCLICK,self.cl_CHome.clickDLM,self.cl_CHome);
        Emitter.register(EmitterCode.CTRL_HOMEJLBCLICK,self.cl_CHome.clickJLB,self.cl_CHome);
        Emitter.register(EmitterCode.CTRL_HOMECTMCLICK,self.cl_CHome.clickCTM,self.cl_CHome);
        Emitter.register(EmitterCode.CTRL_LEFTCLICKJOINROOM,self.cl_CLeft.click_JoinRoom,self.cl_CLeft);
        Emitter.register(EmitterCode.CTRL_LEFTCLICKOPENDROOM,self.cl_CLeft.click_OpendRoom,self.cl_CLeft);

    }
}
