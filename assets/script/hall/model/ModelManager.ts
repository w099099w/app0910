import Emitter from "../../common/Emitter";
import MHome from "./MHome";
import MLeft from "./MLeft";

export default class ModelManager {
    private cl_MHome:MHome;
    private cl_MLeft:MLeft;
    private static m_instance;
    private constructor(){
        this.createAllModel();
    }
    public static getInstance(){
        if(!ModelManager.m_instance){
            ModelManager.m_instance = new ModelManager();
            return ModelManager.m_instance;
        }
        return ModelManager.m_instance;
    }

    private createAllModel(){
        this.cl_MHome = new MHome();
        this.cl_MLeft = new MLeft();
    }

    public start(){
        this.cl_MHome.start();
    }

    public getMode_Home():MHome{
        return this.cl_MHome;
    }
    public getMode_CLeft():MLeft{
        return this.cl_MLeft;
    }
}
