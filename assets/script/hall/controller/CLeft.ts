import ControllerManager from "./ControllerManager";

export default class CLeft{
    public init(){
        
    }
    /**
     * HOME控制器执行HOME模型层方法
     */
    public start(){

    }

    //控制器通知模型改变视图
    public click_JoinRoom(){
        ControllerManager.getInstance().getModelManager().getMode_CLeft().click_JoinRoom();
    }
    public click_OpendRoom(){
        ControllerManager.getInstance().getModelManager().getMode_CLeft().click_OpendRoom();
    }

}
