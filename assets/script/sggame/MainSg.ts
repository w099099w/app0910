// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import NodePool from "../common/NodePool";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import AudioManager from "../units/AudioManager";
import OpenCard from "./OpenCard";
import Player from "./Player";
import SGView from "./SGView";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu('场景主脚本/MainSg')
export default class MainSg extends cc.Component {
    //正式变量
    private cl_SGView: SGView;
    private cl_Player: Player;
    private AnimPrefab: AnimPrefab;
    @property(cc.Prefab)
    tomato: cc.Prefab = null;
    @property(cc.Prefab)
    flower: cc.Prefab = null;
    @property(cc.Prefab)
    boom: cc.Prefab = null;
    @property(cc.Prefab)
    water: cc.Prefab = null;
    @property(cc.Prefab)
    hand: cc.Prefab = null;
    @property(cc.Prefab)
    goldPrefab: cc.Prefab = null;

    onLoad() {
        this.initAudio();
        NodePool.getInstance().createrNodePool('SgGold', this.goldPrefab, 100);
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast', this.node));
        this.AnimPrefab = {
            tomato: this.tomato,
            flower: this.flower,
            boom: this.boom,
            water: this.water,
            hand: this.hand,
        }
        this.cl_SGView = new SGView(this.node);
        this.cl_Player = new Player(this.node, this.AnimPrefab);
    }
    initAudio() {
        if (AudioManager.getInstance().getBgmCode() !== BGM_CODE.BGM_GAME_SG) {
            AudioManager.getInstance().playBgmFromLocal(BGM_CODE.BGM_GAME_SG, true);
            AudioManager.getInstance().setBgmVol();
            AudioManager.getInstance().setEffVol();
        }
    }
    start() {
        this.cl_SGView.start();
        this.cl_Player.start();//主分发场景
    }
    // update (dt) {}
    onDestroy() {
        this.cl_Player.onDestroy();
        this.cl_SGView.onDestroy();
        this.cl_SGView = null;
        NodePool.getInstance().cleanPool('SGgold');
    }
}
