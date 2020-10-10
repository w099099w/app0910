import MyAnimation from "../common/MyAnimation";
import Passport from "../passport/Passoprt";
import RoomView from "./RoomView";

export class MGame extends MyAnimation {
    private S_GameSanGong: BUTTON_STATE;
    private S_GameCowCow: BUTTON_STATE;
    private S_GameSanGongBJH: BUTTON_STATE;
    private S_GameTuiTongZi: BUTTON_STATE;
    private S_GameLongHu: BUTTON_STATE;
    protected constructor() {
        super();
        this.S_GameSanGongBJH = this.S_GameTuiTongZi = this.S_GameCowCow = this.S_GameLongHu = BUTTON_STATE.OFF;
        this.S_GameSanGong = BUTTON_STATE.ON;
    }
    protected getGameSanGongState(): BUTTON_STATE {
        return this.S_GameSanGong;
    }
    protected getGameCowCowState(): BUTTON_STATE {
        return this.S_GameCowCow;
    }
    protected getGameSanGongBJHState(): BUTTON_STATE {
        return this.S_GameSanGongBJH;
    }
    protected getGameTuiTongZiState(): BUTTON_STATE {
        return this.S_GameTuiTongZi;
    }
    protected getGameLongHuState(): BUTTON_STATE {
        return this.S_GameLongHu;
    }
}

export default class GameView extends MGame {
    private node: cc.Node;
    private m_gameLayout: cc.Node[];
    private curentRoomViewID: number;
    private m_gameName: cc.Label;
    private m_root: cc.Node;
    private m_toast: cc.Node;
    private cl_roomView: RoomView;
    public constructor(Node: cc.Node, RoomView: RoomView) {
        super();
        this.node = Node;
        this.m_root = cc.find('gameview', this.node);
        this.m_gameLayout = cc.find('gameview/view/content', this.node).children;
        this.m_toast = cc.find('common/toast', this.node);
        this.m_gameName = cc.find('top/center/gamename', this.node).getComponent(cc.Label);
        this.cl_roomView = RoomView;
        this.m_root.active = false;
    }
    private InitView() {
        this.m_gameLayout.forEach((citem, ckey) => {
            switch (citem.name) {
                case 'game_sangong': {
                    citem.active = Boolean(this.getGameSanGongState());
                } break;
                case 'game_cowcow': {
                    citem.active = Boolean(this.getGameCowCowState());
                } break;
                case 'game_bijinghua': {
                    citem.active = Boolean(this.getGameSanGongBJHState());
                } break;
                case 'game_tuitongzi': {
                    citem.active = Boolean(this.getGameTuiTongZiState());
                } break;
                case 'game_longhu': {
                    citem.active = Boolean(this.getGameLongHuState());
                } break;
            }
        }, this);
        //初始化移出
        for (let i = 0; i < this.m_gameLayout.length; ++i) {
            if (this.m_gameLayout[i].active) {
                this.ClickGame(this.m_gameLayout[i], i);
                break;
            }
        }
        this.addEvent();
        this.m_root.active = true;
    }
    private ClickGame(item, key) {
        this.curentRoomViewID = key;
        this.m_gameLayout.forEach((citem, ckey) => {
            switch (citem.name) {
                case 'game_sangong': {
                    if (ckey === key) {
                        this.m_gameName.string = '三 公';
                    }
                } break;
                case 'game_cowcow': {
                    if (ckey === key) {
                        this.m_gameName.string = '牛 牛';
                    }
                } break;
                case 'game_bijinghua': {
                    if (ckey === key) {
                        this.m_gameName.string = '三公比金花';
                    }
                } break;
                case 'game_tuitongzi': {
                    if (ckey === key) {
                        this.m_gameName.string = '推 筒 子';
                    }
                } break;
                case 'game_longhu': {
                    if (ckey === key) {
                        this.m_gameName.string = '龙 虎';
                    }
                } break;
            }
            this.ButtonIsChooseMove(citem, ckey === key, () => {
                this.flushRoomView(key);
            });
        }, this);
        this.cl_roomView.show(key);
    }
    private flushRoomView(GameKey: number) {

    }
    private addEvent() {
        this.m_gameLayout.forEach((item, key) => {
            item.on('touchend', () => {
                if (key === this.curentRoomViewID) {
                    return;
                }
                this.ClickGame(item, key)
            }, this);
        }, this);
    }
    public start() {
        this.InitView();
    }
    public onDestroy() {

    }

}
