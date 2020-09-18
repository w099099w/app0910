import Emitter from "../../common/Emitter";
import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import EmitterCode from "../../units/EmitterCode";
import ModelManager from "../model/ModelManager";

enum BUTTON_STATE{
    OFF,
    ON
}

export default class VHome extends MyAnimation{
    private node:cc.Node;

    private i_homeJLB:cc.Node;
    private i_hoomeDLM:cc.Node;
    private i_homeCTM:cc.Node;

    private m_particalOne:ParticleStruct;
    private m_particalTwo:ParticleStruct;
    private m_toast:cc.Node;

    private cl_MModelManager:ModelManager;

    public constructor(Node:cc.Node,ModelManager:ModelManager){
        super();
        this.node = Node;
        this.cl_MModelManager = ModelManager;
        this.m_particalOne = new ParticleStruct(0,cc.find('home/home_dlm/particle1',this.node));
        this.m_particalTwo = new ParticleStruct(1,cc.find('home/home_dlm/particle2',this.node));
        this.i_hoomeDLM = cc.find('home/home_dlm',this.node);
        this.i_homeJLB = cc.find('home/home_jlb',this.node);
        this.i_homeCTM = cc.find('home/home_ctm',this.node);
        this.m_toast = cc.find('common/toast',this.node);
        this.addevent();
    }
    /**
     * @description 重置粒子位置
     * @param ParticleId 粒子的有效ID
     */
    public resetParticlePos(ParticleId:number){
        switch(ParticleId){
            case 0:this.m_particalOne.node.position = this.cl_MModelManager.getMode_Home().getParticleOnePos(0);break;
            case 1:this.m_particalTwo.node.position = this.cl_MModelManager.getMode_Home().getParticleTwoPos(0);break;
            default:cc.error('ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:resetParticlePos PARAMS:ParticleId = '+ ParticleId);return;
        }
    }
    /**
     * @description 重置所有粒子的位置
     */
    public resetAllParticlePos(){
        this.resetParticlePos(0);
        this.resetParticlePos(1);
    }
    public enableParticle(ParticleId:number){
        let particleNode:ParticleStruct = this.getParticleFromId(ParticleId);
        if(particleNode){
            particleNode.node.active = true;
        }
    }
    public disableParticle(ParticleId:number){
        let particleNode:ParticleStruct = this.getParticleFromId(ParticleId);
        if(particleNode){
            particleNode.node.active = false;
        }
    }
    /**
     * @description 运行粒子效果
     * @param ParticleId 粒子效果的可用ID[1,2];
     */
    public runPartiCle(ParticleId:number,TweenId:number){
        this.enableParticle(ParticleId);
        this.movePos(TweenId,this.getParticleFromId(ParticleId).node,this.cl_MModelManager.getMode_Home().getParticleNextPos(ParticleId),()=>{this.runPartiCle(ParticleId,TweenId)});
    }
    /**
     * @description 停止粒子动画(但不会关闭粒子的显示若要关闭请手动调用disableParticle)
     * @param TweenID 运行的粒子的缓动ID
     */
    public stopPartiCle(TweenID:number){
        this.stopMovePos(TweenID);
    }
    public getParticleFromId(ParticleId:number):ParticleStruct{
        switch(ParticleId){
            case 0:if(this.m_particalOne && this.m_particalOne.id === ParticleId){return this.m_particalOne}else{cc.error('ERROR CODE 503:该粒子尚未赋值')};break;
            case 1:if(this.m_particalTwo && this.m_particalTwo.id === ParticleId){return this.m_particalTwo}else{cc.error('ERROR CODE 503:该粒子尚未赋值')};break;
            default:cc.error('ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:runPartiCle PARAMS:ParticleId = '+ ParticleId);return null;
        }
    }
    public runParticleRender(eventname:number,ParticleId:number,TweenID:number){
        this.resetParticlePos(ParticleId);
        this.runPartiCle(ParticleId,TweenID);
    } 

    public click_DLM(){
        switch(this.cl_MModelManager.getMode_Home().getDLMButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('连接服务器失败!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    } 
    public click_JLB(){
        switch(this.cl_MModelManager.getMode_Home().getJLBButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }    
    public click_CTM(){
        switch(this.cl_MModelManager.getMode_Home().getCTMButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:return;break;
        }
    }       
    public addevent(){
        this.i_hoomeDLM.on('touchend',()=>{
            Emitter.fire(EmitterCode.CTRL_HOMEDLMCLICK);
        },this)
        this.i_homeJLB.on('touchend',()=>{
            Emitter.fire(EmitterCode.CTRL_HOMEJLBCLICK);
        },this)
        this.i_homeCTM.on('touchend',()=>{
            Emitter.fire(EmitterCode.CTRL_HOMECTMCLICK);
        },this)
    }
}
export class ParticleStruct{
    public id:number;
    public node:cc.Node;
    public constructor(Id:number,Node:cc.Node){
        this.id = Id;
        this.node = Node;
    }
}
