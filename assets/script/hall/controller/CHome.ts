import MHome from "../model/MHome";
import VHome from "../view/VHome";
import ControllerManager from "./ControllerManager";

export default class CHome{
    public init(){
        
    }
    /**
     * HOME控制器执行HOME模型层方法
     */
    public start(){
        ControllerManager.getInstance().getModelManager().getMode_Home().start();
    }
    public clickDLM(){
        ControllerManager.getInstance().getModelManager().getMode_Home().clictDlm();
    }
    public clickJLB(){
        ControllerManager.getInstance().getModelManager().getMode_Home().clictJlb();
    }
    public clickCTM(){
        ControllerManager.getInstance().getModelManager().getMode_Home().clictCtm();
    }
}
