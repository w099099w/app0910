import Emitter from "../../common/Emitter";
import MyAnimation from "../../common/MyAnimation";
import SceneManager from "../../common/SceneManager";
import Toast from "../../common/Toast";
import EmitterCode from "../../units/EmitterCode";
import Tool from "../../units/Tool";

export class ParticleStruct {
    public id: number;
    public node: cc.Node;
    public constructor(Id: number, Node: cc.Node) {
        this.id = Id;
        this.node = Node;
    }
}

export class MHome extends MyAnimation {
    private a_particleOnePos: cc.Vec2[];
    private a_particleTwoPos: cc.Vec2[];
    private m_curParticleOnePosIndex: number;
    private m_curParticleTwoPosIndex: number;
    private S_dlmState: number;
    private S_jlbState: number;
    private S_ctmState: number;

    public constructor() {
        super();
        this.S_jlbState = this.S_ctmState = BUTTON_STATE.OFF;
        this.S_dlmState = BUTTON_STATE.ON;
        this.a_particleOnePos = [
            new cc.Vec2(-190, 0),
            new cc.Vec2(0, 190),
            new cc.Vec2(190, 0),
            new cc.Vec2(0, -190),
        ]
        this.a_particleTwoPos = [
            new cc.Vec2(190, 0),
            new cc.Vec2(0, -190),
            new cc.Vec2(-190, 0),
            new cc.Vec2(0, 190),
        ]
        this.m_curParticleOnePosIndex = this.m_curParticleTwoPosIndex = 0
    }
    public getParticleOnePos(index: number): cc.Vec3 {
        if (index < 0 || index > this.a_particleOnePos.length - 1) {
            return null;
        }
        return new cc.Vec3(this.a_particleOnePos[index].x, this.a_particleOnePos[index].y, 0);
    }
    public getParticleTwoPos(index: number): cc.Vec3 {
        if (index < 0 || index > this.a_particleTwoPos.length - 1) {
            return null;
        }
        return new cc.Vec3(this.a_particleTwoPos[index].x, this.a_particleTwoPos[index].y, 0);
    }
    private getParticleNextIndex(ParticleId: number) {
        let curentIndex: number;
        let curentIndexLength: number;
        switch (ParticleId) {
            case 0: curentIndex = this.m_curParticleOnePosIndex; curentIndexLength = this.a_particleOnePos.length; break;
            case 1: curentIndex = this.m_curParticleTwoPosIndex; curentIndexLength = this.a_particleTwoPos.length; break;
            default: cc.error("没有该ID的粒子"); return null;
        }
        curentIndex += 1;
        if (curentIndex > curentIndexLength - 1) {
            curentIndex = 0;
        }
        this.setParticleCurentIndex(ParticleId, curentIndex);
        return curentIndex;
    }
    public setParticleCurentIndex(ParticleId: number, Index: number) {
        switch (ParticleId) {
            case 0: this.m_curParticleOnePosIndex = Index; break;
            case 1: this.m_curParticleTwoPosIndex = Index; break;
            default: cc.error("没有该ID的粒子"); return null;
        }
    }
    public getParticleNextPos(ParticleId: number) {
        switch (ParticleId) {
            case 0: return this.getParticleOnePos(this.getParticleNextIndex(0)); break;
            case 1: return this.getParticleTwoPos(this.getParticleNextIndex(1)); break;
            default: cc.error("没有该ID的粒子"); return null;
        }
    }

    public getDLMButtonState() {
        return this.S_dlmState;
    }

    public getJLBButtonState() {
        return this.S_jlbState;
    }

    public getCTMButtonState() {
        return this.S_ctmState;
    }
}

export default class Home extends MHome{
    private node: cc.Node;

    private i_homeJLB: cc.Node;
    private i_hoomeDLM: cc.Node;
    private i_homeCTM: cc.Node;

    private m_particalOne: ParticleStruct;
    private m_particalTwo: ParticleStruct;
    private m_toast: cc.Node;

    public constructor(Node: cc.Node) {
        super();
        this.node = Node;
        this.m_particalOne = new ParticleStruct(0, cc.find('home/home_dlm/particle1', this.node));
        this.m_particalTwo = new ParticleStruct(1, cc.find('home/home_dlm/particle2', this.node));
        this.i_hoomeDLM = cc.find('home/home_dlm', this.node);
        this.i_homeJLB = cc.find('home/home_jlb', this.node);
        this.i_homeCTM = cc.find('home/home_ctm', this.node);
        this.m_toast = cc.find('common/toast', this.node);
        this.addevent();
    }
    /**
     * @description 重置粒子位置
     * @param ParticleId 粒子的有效ID
     */
    public resetParticlePos(ParticleId: number) {
        switch (ParticleId) {
            case 0: this.m_particalOne.node.position = this.getParticleOnePos(0); break;
            case 1: this.m_particalTwo.node.position = this.getParticleTwoPos(0); break;
            default: cc.error('ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:resetParticlePos PARAMS:ParticleId = ' + ParticleId); return;
        }
    }
    /**
     * @description 重置所有粒子的位置
     */
    public resetAllParticlePos() {
        this.resetParticlePos(0);
        this.resetParticlePos(1);
    }
    public enableParticle(ParticleId: number) {
        let particleNode: ParticleStruct = this.getParticleFromId(ParticleId);
        if (particleNode) {
            particleNode.node.active = true;
        }
    }
    public disableParticle(ParticleId: number) {
        let particleNode: ParticleStruct = this.getParticleFromId(ParticleId);
        if (particleNode) {
            particleNode.node.active = false;
        }
    }
    /**
     * @description 运行粒子效果
     * @param ParticleId 粒子效果的可用ID[1,2];
     */
    public runPartiCle(ParticleId: number, TweenId: number) {
        this.enableParticle(ParticleId);
        this.movePos(TweenId, this.getParticleFromId(ParticleId).node, this.getParticleNextPos(ParticleId), () => { this.runPartiCle(ParticleId, TweenId) });
    }
    /**
     * @description 停止粒子动画(但不会关闭粒子的显示若要关闭请手动调用disableParticle)
     * @param TweenID 运行的粒子的缓动ID
     */
    public stopPartiCle(TweenID: number) {
        this.stopMovePos(TweenID);
    }
    public getParticleFromId(ParticleId: number): ParticleStruct {
        switch (ParticleId) {
            case 0: if (this.m_particalOne && this.m_particalOne.id === ParticleId) { return this.m_particalOne } else { cc.error('ERROR CODE 503:该粒子尚未赋值') }; break;
            case 1: if (this.m_particalTwo && this.m_particalTwo.id === ParticleId) { return this.m_particalTwo } else { cc.error('ERROR CODE 503:该粒子尚未赋值') }; break;
            default: cc.error('ERROR CODE 404:找不到该粒子 SCRIPT POS CLASS:VHOM METHOD:runPartiCle PARAMS:ParticleId = ' + ParticleId); return null;
        }
    }
    public runParticleRender(eventname: number, ParticleId: number, TweenID: number) {
        this.resetParticlePos(ParticleId);
        this.runPartiCle(ParticleId, TweenID);
    }

    public click_DLM() {
        switch (this.getDLMButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('连接服务器失败!', this.m_toast); break;
            case BUTTON_STATE.ON: {SceneManager.getInstance().loadScene('room')}; break;
        }
    }
    public click_JLB() {
        switch (this.getJLBButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('暂未开放!', this.m_toast); break;
            case BUTTON_STATE.ON: return; break;
        }
    }
    public click_CTM() {
        switch (this.getCTMButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('暂未开放!', this.m_toast); break;
            case BUTTON_STATE.ON: return; break;
        }
    }
    public addevent() {
        this.i_hoomeDLM.on('touchend', () => {
            this.click_DLM();
        }, this)
        this.i_homeJLB.on('touchend', () => {
            this.click_JLB();
        }, this)
        this.i_homeCTM.on('touchend', () => {
            this.click_CTM();
        }, this)
    }
    //控制区域
    /**
     * @description 显示粒子动画
     */
    public start() {
        this.resetAllParticlePos();
        this.runPartiCle(0, Tool.getInstance().genNonDuplicateID());
        this.runPartiCle(1, Tool.getInstance().genNonDuplicateID());
    }
    public onDestory(){
        
    }
}
