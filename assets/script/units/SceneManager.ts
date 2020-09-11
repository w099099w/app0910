const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager extends cc.Component{
    private static m_sceneNameArr:string[]; 
    protected  m_instance: SceneManager;
    protected  m_curScene:cc.Scene;
    public constructor(){
        super();
        SceneManager.m_sceneNameArr = [
            'passport',
        ]
    }
    public setScene(Scene:cc.Scene){
        this.m_curScene = Scene;
    }
    public getSceneName():string{
        return this.m_curScene.name;
    }
    public static endgame(){
        cc.game.end();
    }
    public loadScene(SceneName:string){
        if(SceneManager.m_sceneNameArr.includes(SceneName)){
            cc.director.loadScene(SceneName);
            return true;
        }
        return false;
    }
}
