import MyAnimation from "../common/MyAnimation";
import List from "../units/List";
import Tool from "../units/Tool";

export class MRoom extends MyAnimation {
    private m_cache = [];
    protected flushRoomViewFunction: Function;
    protected ti:number;
    protected tic:number;
    protected tie:number;
    protected constructor(){
        super();
        this.Init();
    }
    protected ReSet(){
        this.m_cache = []
    }
    protected Init() {
        this.ti = setInterval(() => {
            let data = {
                player: [],
                maxPlayer:Tool.getInstance().randomAccess(6,10),
                bet: Math.ceil(Math.random() * 100) * 100,
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
        console.log(data)
        return data;
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

    public constructor(Node: cc.Node) {
        super();
        this.node = Node;
        this.flushRoomViewFunction = this.FlushRoomView;
        this.m_toast = cc.find('common/toast', this.node);
        this.m_root = cc.find('roomview', this.node);
        this.m_itemLayout = cc.find('roomview/view/content', this.node);
        this.c_list = cc.find('roomview', this.node).getComponent('List');
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
    public clickMainFunction(Item: cc.Node, Index: number, LastId: number) {

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
