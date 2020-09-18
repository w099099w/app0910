import Emitter from "../../common/Emitter";
import EmitterCode from "../../units/EmitterCode";
import Tool from "../../units/Tool";

enum E_PARTICLEID{
    particleOne,
    particleTwo,
}
enum BUTTON_STATE{
    OFF,
    ON
}
export default class MHome{
    private a_particleOnePos:cc.Vec2[];
    private a_particleTwoPos:cc.Vec2[];
    private m_curParticleOnePosIndex:number;
    private m_curParticleTwoPosIndex:number;
    private S_dlmState:number;
    private S_jlbState:number;
    private S_ctmState:number;

    public constructor(){
       this.S_dlmState = this.S_jlbState = this.S_ctmState = BUTTON_STATE.OFF;
       this.a_particleOnePos = [
            new cc.Vec2(-190,0),
            new cc.Vec2(0,190),
            new cc.Vec2(190,0),
            new cc.Vec2(0,-190),
        ]
        this.a_particleTwoPos = [
            new cc.Vec2(190,0),
            new cc.Vec2(0,-190),
            new cc.Vec2(-190,0),
            new cc.Vec2(0,190),
        ]
        this.m_curParticleOnePosIndex = this.m_curParticleTwoPosIndex = 0
    }
    public getParticleOnePos(index:number):cc.Vec3{
        if(index < 0 || index > this.a_particleOnePos.length-1){
            return null;
        }
        return new cc.Vec3(this.a_particleOnePos[index].x,this.a_particleOnePos[index].y,0);
    }
    public getParticleTwoPos(index:number):cc.Vec3{
        if(index < 0 || index > this.a_particleTwoPos.length-1){
            return null;
        }
        return new cc.Vec3(this.a_particleTwoPos[index].x,this.a_particleTwoPos[index].y,0);
    }
    private getParticleNextIndex(ParticleId:number){
        let curentIndex:number; 
        let curentIndexLength:number;
        switch (ParticleId){
            case 0:curentIndex = this.m_curParticleOnePosIndex;curentIndexLength = this.a_particleOnePos.length;break;
            case 1:curentIndex = this.m_curParticleTwoPosIndex;curentIndexLength = this.a_particleTwoPos.length;break;
            default:cc.error("没有该ID的粒子");return null;
        }
        curentIndex += 1;
        if(curentIndex > curentIndexLength - 1){
            curentIndex = 0;
        }
        this.setParticleCurentIndex(ParticleId,curentIndex);
        return curentIndex;
    }
    public setParticleCurentIndex(ParticleId:number,Index:number){
        switch (ParticleId){
            case 0:this.m_curParticleOnePosIndex = Index;break;
            case 1:this.m_curParticleTwoPosIndex = Index;break;
            default:cc.error("没有该ID的粒子");return null;
        }
    }
    public getParticleNextPos(ParticleId:number){
        switch (ParticleId){
            case 0:return this.getParticleOnePos(this.getParticleNextIndex(0));break;
            case 1:return this.getParticleTwoPos(this.getParticleNextIndex(1));break;
            default:cc.error("没有该ID的粒子");return null;
        }
    }

    public getDLMButtonState(){
        return this.S_dlmState;
    }

    public getJLBButtonState(){
        return this.S_jlbState;
    }

    public getCTMButtonState(){
        return this.S_ctmState;
    }
    
    /**
     * @description 通知视图层显示粒子动画
     */
    public start(){
        Emitter.fire(EmitterCode.MODE_HOMESTARTPARTICLE,0,Tool.getInstance().genNonDuplicateID());
        Emitter.fire(EmitterCode.MODE_HOMESTARTPARTICLE,1,Tool.getInstance().genNonDuplicateID());
    }
    public clictDlm(){
        if(this.S_dlmState){

        }
        Emitter.fire(EmitterCode.MODE_HOMECLICKDLM);
    }
    public clictJlb(){
        if(this.S_jlbState){

        }
        Emitter.fire(EmitterCode.MODE_HOMECLICKJLB);
    }
    public clictCtm(){
        if(this.S_ctmState){

        }
        Emitter.fire(EmitterCode.MODE_HOMECLICKCTM);
    }

}
