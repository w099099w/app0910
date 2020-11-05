import Load from "../common/Load";
import MyAnimation from "../common/MyAnimation";
import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import HttpRequest from "../units/HttpRequest";
import List from "../units/List";
import Tool from "../units/Tool";
import UserConfig from "../units/UserConfig";
import RuleView from "./RuleView";

export class MRoom extends MyAnimation {
    private isfirst:boolean;
    private m_cache = [];
    protected flushRoomViewFunction: Function;
    private S_tableTogame:BUTTON_STATE;
    private S_tableToRule:BUTTON_STATE;
    protected ti:number;
    protected tic:number;
    protected tie:number;
    protected constructor(){
        super();
        this.ReqRoomList();
        this.S_tableToRule = BUTTON_STATE.ON;
        this.S_tableTogame = BUTTON_STATE.ON;
        this.Init();
    }
    protected ReqRoomList(){
        this.isfirst = true;
        HttpRequest.Req('get','/foo/room/list/1',{page:1,limit:20},Load.getInstance(),(Success:HttpReq)=>{
            if(Success.code === 0 && Success.message === 'OK'){
                HttpRequest.Req('get','/foo/room/list/1',{page:1,limit:Success.data},Load.getInstance(),(Success:HttpReq)=>{
                },(Failed:HttpReq)=>{
                    this.ToastShow(Failed.message);
                });
            }
        },(Failed:HttpReq)=>{
            this.ToastShow(Failed.message);
        });
    }
    protected ReSet(){
        this.m_cache = []
    }
    protected Init() {
        this.m_cache = [];
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
    private roomData(Data){
        if(this.isfirst){
            this.isfirst = false;
            return;
        }
        this.m_cache = [];
        for(let i = 0;i< Data.count;++i){
            let room = Data.info[i];
            let data = {
                        max:Tool.getInstance().randomAccess(room.antes,room.antes*100),
                        rule:room.max_gamer+'人桌 满'+room.auto_gamer+'人开 快速模式 禁用道具 禁止搓牌 中途禁入',
                        gamenum:room.max_round,
                        player: [],
                        maxPlayer:room.max_gamer,
                        bet: room.antes,
                        tableNum: room.room_id
                    }
            for(let k = 0;k < room.members_info.length;++k){
                let player = room.members_info[k];
                let playerInfo = {
                    name: player.nickname,
                    active: true,
                    avatar:player.avatar,
                    id:player.member_id
                }
                data.player.push(playerInfo);
            }
            this.m_cache.push(data);
        }
    }
    public OnWebsocketMessage(code,Data) {
        switch (code){
            case 'roomList':this.roomData(Data);break;
        }
        this.flushRoomViewFunction();
    }
    protected ToastShow(str:string){};
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
                        let data = this.getDataFromIndex(Index, false);
                        UserConfig.getInstance().setTableInfo({tablenum:data.tableNum,min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
                        SceneManager.getInstance().loadScene('game_sg');
                    }break;
                }
            }break;
            case ROOM_CLICK_POS.DOWNTABLE:{
                switch(this.getTableButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        let data = this.getDataFromIndex(Index, true);
                        UserConfig.getInstance().setTableInfo({tablenum:data.tableNum,min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
                        SceneManager.getInstance().loadScene('game_sg');
                    }break;
                }
            }break;
            case ROOM_CLICK_POS.UPRULE:{
                switch(this.getTableRuleButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        let data = this.getDataFromIndex(Index, false);
                        this.cl_RuleView.show({tablenum:data.tableNum,min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
                    }break;
                }   
            }break;
            case ROOM_CLICK_POS.DOWNRULE:{
                switch(this.getTableRuleButtonState()){
                    case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
                    case BUTTON_STATE.ON:{
                        let data = this.getDataFromIndex(Index, true);
                        this.cl_RuleView.show({tablenum:data.tableNum,min:data.bet,max:data.max,gamenum:data.gamenum,rule:data.rule});
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
                    if(data.player[key]){
                        cc.find('isopen/name', item).getComponent(cc.Label).string = data.player[key].name;
                        Tool.getInstance().LoadImageRemote(cc.find('isopen/avatar/image',item),data.player[key].avatar);
                    }
                    item.getChildByName('isopen').active = data.player[key]?data.player[key].active:false;
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
                if(data.player[key]){
                    cc.find('isopen/name', item).getComponent(cc.Label).string = data.player[key].name;
                    Tool.getInstance().LoadImageRemote(cc.find('isopen/avatar/image',item),data.player[key].avatar);
                }
                item.getChildByName('isopen').active = data.player[key]?data.player[key].active:false;
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
    public ToastShow(str:string){
        Toast.getInstance().show(str,this.m_toast);
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
