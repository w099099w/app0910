const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager{
    private m_isFirstLogin:boolean;
    private  m_sceneNameArr:string[]; 
    protected  static m_instance: SceneManager;
    protected   m_curScene:cc.Scene;
    private constructor(){
        this.m_isFirstLogin = true;
        this.m_sceneNameArr = [
            'passport',
            'hall'
        ];
    }
    public static getInstance():SceneManager{
        if(!SceneManager.m_instance){
            SceneManager.m_instance = new SceneManager();
            return SceneManager.m_instance;
        }
        return SceneManager.m_instance;
    }
    public preloadScene(callBackProgress:Function = null,loadFinish:Function = null){
        this.m_isFirstLogin = false;
        this.m_sceneNameArr.forEach((sceneName,key)=>{
            if(sceneName !== 'passport'){
                cc.director.preloadScene(sceneName,(completedCount,totalCount,item)=>{
                    let progress:number = (100/(this.m_sceneNameArr.length-1))*(key-1)+(completedCount/totalCount)*100;
                    if(callBackProgress){
                        callBackProgress(progress);
                    }
                },(error)=>{
                    if(loadFinish){
                        loadFinish(error);
                    }
                })
            }
        });
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
