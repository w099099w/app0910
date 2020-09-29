const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager{
    private m_isFirstLogin:boolean;
    private  m_sceneNameArr:string[];
    private loadIndex:number; 
    protected  static m_instance: SceneManager;
    protected   m_curScene:cc.Scene;
    private constructor(){
        this.m_isFirstLogin = true;
        this.loadIndex = 1;//不含passport
        this.m_sceneNameArr = [
            'passport',
            'hall',
            'room'
        ];
    }
    public static getInstance():SceneManager{
        if(!SceneManager.m_instance){
            SceneManager.m_instance = new SceneManager();
            return SceneManager.m_instance;
        }
        return SceneManager.m_instance;
    }
    public preloadScene(callBackProgress:Function = null,loadSceneError:Function = null){
        this.m_isFirstLogin = false;
        this.preloadSceneForeach(callBackProgress,loadSceneError);
    }

    private preloadSceneForeach(callBackProgress:Function = null,loadSceneError:Function = null){
        let singelSceneAdd = 100/(this.m_sceneNameArr.length-1);
        let curentAdd = singelSceneAdd*(this.loadIndex-1);
        let lastNum:number = 0;
        cc.director.preloadScene(this.m_sceneNameArr[this.loadIndex],(completedCount,totalCount,item)=>{
            let progress:number = curentAdd+(completedCount/totalCount)*singelSceneAdd;
            if(progress < lastNum){
                progress = lastNum;
            }
            lastNum = progress;
            if(callBackProgress){
                callBackProgress(progress);
            }
            if(completedCount === totalCount){
                if(this.loadIndex === this.m_sceneNameArr.length - 1){
                    return;
                }
                this.loadIndex += 1;
                this.preloadSceneForeach(callBackProgress,loadSceneError);
            }
        },(error)=>{
            if(loadSceneError){
                loadSceneError(error);
            }
        })
    }
    public setScene(Scene:cc.Scene){
        this.m_curScene = Scene;
    }
    public getSceneName():string{
        return this.m_curScene.name;
    }
    public endgame(){
        cc.game.end();
    }
    public getIsFirstLoad():boolean{
        return this.m_isFirstLogin;
    }
    public loadScene(SceneName:string){
        if(this.m_sceneNameArr.includes(SceneName)){
            cc.director.loadScene(SceneName);
            return true;
        }
        return false;
    }
}
