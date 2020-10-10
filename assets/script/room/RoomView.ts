import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import List from "../units/List";
import Tool from "../units/Tool";
import RuleView from "./RuleView";

export class MRoom extends MyAnimation {
    private m_cache = [];
    protected flushRoomViewFunction: Function;
    private S_tableTogame:BUTTON_STATE;
    private S_tableToRule:BUTTON_STATE;
    protected ti:number;
    protected tic:number;
    protected tie:number;
    protected constructor(){
        super();
        this.S_tableToRule = BUTTON_STATE.ON;
        this.S_tableTogame = BUTTON_STATE.ON;
        this.Init();
    }
    protected ReSet(){
        this.m_cache = []
    }
    protected Init() {
        this.ti = setInterval(() => {
            if(this.m_cache.length > 5){
                return;
            }
            let minbet = Math.ceil(Math.random() * 100) * 100;
            let data = {
                max:Tool.getInstance().randomAccess(minbet,100*100),
                rule:Tool.getInstance().getRandomName(56),
                gamenum:Tool.getInstance().randomAccess(400,6000),
                player: [],
                maxPlayer:Tool.getInstance().randomAccess(6,10),
                bet: minbet,
                tableNum: Tool.getInstance().randomNumber(5)
            }
            for(let i = 0; i < data.maxPlayer;++i){
                data.player.push({
                    name: Tool.getInstance().getRandomName(3),
                    active: true
                });  
            }
            this.m_cache.push(data);
            this.OnWebsocketMessage();
        }, 5000);
        this.tic = setTimeout(() => {
            this.tie = setInterval(() => {
                let id = Math.ceil(Math.random() * (this.m_cache.length - 1));
                if(this.m_cache[id]){
                    let peoPleid = Math.ceil(Math.random() * this.m_cache[id].maxPlayer-1);
                    if (this.m_cache[id].player[peoPleid].active) {
                        this.m_cache[id].player[peoPleid].active = false;
                    } else {
                        this.m_cache[id].player[peoPleid].name = Tool.getInstance().getRandomName(3);
                        this.m_cache[id].player[peoPleid].active = true;
                    }
                }
                this.OnWebsocketMessage();
            }, 2000);
            this.tic = null;
        }, 5000);

    }
    protected getDataFromIndex(Index: number, IsDown: boolean) {
        if (IsDown) {
            return this.m_cache[Index * 2 + 1];
        } else {
            return this.m_cache[Index * 2];
        }
    }
    protected getRoomNum(): RommListNum {
        let data: RommListNum = {
            numItems: 0,
            activeDown: true
        }
        data.numItems = Math.ceil(this.m_cache.length / 2);
        if (this.m_cache.length % 2 === 1) {
            data.activeDown = false;
        }
        return data;
    }
    protected getTableButtonState():BUTTON_STATE{
        return this.S_tableTogame;
    }
    protected getTableRuleButtonState():BUTTON_STATE{
        return this.S_tableToRule;
    }
    protected OnWebsocketMessage() {
        this.flushRoomViewFunction();
    }
}

export default class RoomView extends MRoom {
    private node: cc.Node;
    private m_root: cc.Node;
    private m_toast: cc.Node;
    private m_curentGameID: number;
    private m_itemLayout: cc.Node;
    private c_list: List;

    private cl_RuleView:RuleView;
    public constructor(Node: cc.Node,RuleView:RuleView) {
        super();
        this.node = Node;
        this.flushRoomViewFunction = this.FlushRoomView;
        this.m_toast = cc.find('common/toast', this.node);
        this.m_root = cc.find('roomview', this.node);
        this.m_itemLayout = cc.find('roomview/view/content', this.node);
        this.c_list = cc.find('roomview', this.node).getComponent('List');
        this.cl_RuleView = RuleView;
    }
    public show(GameID: number) {
        this.ReSet();
        this.RemoveAllChild(GameID);
        this.FlushRoomView();
        this.m_root.active = true;
    }
    public RemoveAllChild(ChooseView: number) {
        this.m_curentGameID = ChooseView;
        this.m_itemLayout.children.forEach((item: cc.Node) => {
            this.c_list._delSingleItem(item)
        })
        this.m_itemLayout.removeAllChildren();
        this.c_list.PrefabIndex = ChooseView;
    }
    public clickMainFunction(Item: cc.Node, Index: number, LastId: number,ClickPos:RoomTableClick) {
        switch(ClickPos.pos){
            case ROOM_CLICK_POS.UPTABLE:{
                switch(this.getTableButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        SceneManager.getInstance().loadScene('game_sg');
                    }break;
                }
            }break;
            case ROOM_CLICK_POS.DOWNTABLE:{
                switch(this.getTableButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        SceneManager.getInstance().loadScene('game_sg');
                    }break;
                }
            }break;
            case ROOM_CLICK_POS.UPRULE:{
                switch(this.getTableRuleButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        let data = this.getDataFromIndex(Index, false);
                        this.cl_RuleView.show({min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
                    }break;
                }   
            }break;
            case ROOM_CLICK_POS.DOWNRULE:{
                switch(this.getTableRuleButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        let data = this.getDataFromIndex(Index, true);
                        this.cl_RuleView.show({min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
                    }break;
                }
            }break;
        }
    }
    public RenderMainFunction(Item: cc.Node, Index: number) {

        if (Index == this.getRoomNum().numItems - 1 && this.getRoomNum().activeDown == false) {
            Item.getChildByName('down').active = false;
        } else {
            //底部刷新视图
            let data: any = this.getDataFromIndex(Index, true);
            let curPeople: number = 0;
            cc.find('down/palyerlist', Item).children.forEach((item, key) => {
                if (item.getChildByName('isopen').active === true) {
                    curPeople += 1;
                }
                item.getChildByName('isclose').active = Boolean(key > data.maxPlayer-1);
                item.active = true;
                if(key < data.maxPlayer){
                    cc.find('isopen/name', item).getComponent(cc.Label).string = data.player[key].name;
                    item.getChildByName('isopen').active = data.player[key].active;
                }else{
                    item.getChildByName('isopen').active = false;
                }
            }, this);
            cc.find('down/tableid', Item).getComponent(cc.Label).string = String(Index * 2 + 2);
            cc.find('down/bet',Item).getComponent(cc.Label).string = '底注: '+data.bet;
            cc.find('down/room',Item).getComponent(cc.Label).string = '房号:'+data.tableNum;
            cc.find('down/peoplestate', Item).getComponent(cc.Label).string = curPeople === data.maxPlayer ? '客满' : curPeople + '/' + data.maxPlayer;
            Item.getChildByName('down').active = true;
        }
        //上部刷新视图
        let data: any = this.getDataFromIndex(Index, false);
        let curPeople: number = 0;
        cc.find('up/palyerlist', Item).children.forEach((item, key) => {
            if (item.getChildByName('isopen').active === true) {
                curPeople += 1;
            }
            item.getChildByName('isclose').active = Boolean(key > data.maxPlayer-1);
            item.active = true;
            if(key < data.maxPlayer){
                cc.find('isopen/name', item).getComponent(cc.Label).string = data.player[key].name;
                item.getChildByName('isopen').active = data.player[key].active;
            }else{
                item.getChildByName('isopen').active = false;
            }
        }, this);
        cc.find('up/tableid', Item).getComponent(cc.Label).string = String(Index * 2 + 1);
        cc.find('up/bet',Item).getComponent(cc.Label).string = '底注: '+data.bet;
        cc.find('up/room',Item).getComponent(cc.Label).string = '房号:'+data.tableNum;
        cc.find('up/peoplestate', Item).getComponent(cc.Label).string = curPeople === data.maxPlayer ? '客满' : curPeople + '/' + data.maxPlayer;
    }
    public FlushRoomView() {
        this.c_list.numItems = this.getRoomNum().numItems;
        this.c_list.updateAll();
    }
    public OnDestroy() {
        clearInterval(this.ti);
        clearInterval(this.tie);
        if(this.tic){
            clearInterval(this.tic);
        } 
    }
    public Start() {

    }
}
