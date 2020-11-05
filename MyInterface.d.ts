/**
 * @description 安卓方法路径
 */
declare var className:string;

declare enum BUTTON_STATE{
    OFF,
    ON
}
declare enum CHANGE_NAME_RESULT{
    NAME_LENGTH_ERROR,
    NAME_CHECK_ERROR,
    SUCCESS,
    FALILED
}
declare enum RESETPD_RESULT{
	FAILED,
	PASSWORD_LENGTH_NONE,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_NO_SAME,
    PASSWORD_ERROR,
    SUCCESS,
}
declare enum SCENE_ID{
    PASSPORT,
    HALL,
    ROOM,
    GAME_SG,
}
declare enum BGM_CODE{
    BGM_NONE,
    BGM_PASSPORT,
    BGM_HALL,
    BGM_ROOM,
    BGM_GAME_SG,
}
declare enum EFF_CODE{
    EFF_BQANIM_CHICKEN,
    EFF_BQANIM_TOMATO,
    EFF_BQANIM_FLOWER,
    EFF_BQANIM_BOOM,
    EFF_BQANIM_WATER,
    EFF_SG_SENDCARD,
    EFF_SG_NEWGAME,
    EFF_SG_GOLD_ADD,
    EFF_SG_GOLD_SUB,
}
declare enum LOGIN_METHOD {
    PASSWORD,
    PHONE_VERIFY
}
declare enum REALNAME_RESULT{
    FAILED,
	SUCCESS,
	REALNAME_LENGTH_NONE,
	ID_LENGTH_NONE,
	ID_CHECK_ERR,
    VERIFY_FAILED,
}
declare enum PAY_TYPE{
    RECHANGE,
    CASHOUT,
    TRANSFER,
    GAMEBET,
    GAMEWIN,
    SYSTEMADD,
    SYSTEMSUB,
    BETBACK
}
declare enum ROOM_CLICK_POS{
    UPTABLE,
    DOWNTABLE,
    UPRULE,
    DOWNRULE,
}
declare enum DIALOG{
    MB_YES,
    MB_NO,
    MB_YESNO,
}
declare enum CTRLBUTTON{
    NONE,
    PANGGUAN,
    OPENCARD,
}
//网络接口
declare interface VerifyPhone {
    types:number
    mobile: string;
}
declare interface ForgetPD{
    mobile:string;
    code:string;
    password:string;
}
declare interface LoginParams {
    types:number;
    mobile: string;
    password: string;
    client_id:string;
}
declare interface RegistRequest{
    parent_id:number,
    mobile:string;
    code:string;
    password:string;
    types:number;
}
declare interface ChangeInfo{
    genre:number;
    field_one:string;
    field_two:string;
}

declare interface MoneyFlow{
	page:number;
	limit:number;
}
declare interface SendAnimation{
    sendid:string;
    receive:string;
    animationid:number;
}
declare interface SwitchScene{
    prev_scene_type: number;
    prev_game_id: number;
    prev_room_id: number;
    next_scene_types: number;
    next_game_id: number;
    next_room_id: number;
}


//网络接收接口
declare interface HttpReq{
    code:any;
    message:string;
    data:any;
}
declare interface PlayInfo{
    tittle:string;
    contentUrl:string;
}
declare interface MsgInfo{
    tittle:string;
    content:string;
}
declare interface RealNameInfo{
    member_id:number;
	real_name:string;
	id_card:string;
}
declare interface MoneyFlowInfo{
	orderid:string;
	before:number;
	amount:number;
	after:number;
	type:number;
	date:string;
}
declare interface Balance{
    block_rmb:number;
    rmb:number;
    withdrawal_rmb:number;
}

//其他接口(可改接为类方法)
declare interface AUDIO{
    openBgm:boolean;
    openEff:boolean;
    bgmVol:number;
    effVol:number;
}
declare interface UserInfo{
    member_id:number,
    parent_id:number,
    shareholder_id:number,
    is_agent:number,
    is_real:number,
    mobile:string,
    avatar:string,
    nickname:string,
    username:string,
    pd:string,
}
declare interface RommListNum{
    numItems:number;
    activeDown:boolean;
}
declare interface HallPrefabArr{
    PopupLeftButton:cc.Prefab;
}

declare interface ForeachPlayInfo{
    (Tittle:string,contentUrl:string,Index:number):any;
}

declare interface ForeachMsgInfo{
    (Tittle:string,contentUrl:string,Index:number):any;
}
declare interface RoomTableClick{
    id:number,
    pos:number
}
declare interface SanGongRuleInfo{
    tablenum:number;
    min:number,
    max:number,
    gamenum:number,
    rule:string
}
declare interface SgSetView{
    cardid:number;
    tableid:number;
}
declare interface AtlasMap{
    path:string;
    atlas:cc.SpriteAtlas;
}
declare interface PlayerData{
    charid:number,
    id:string,
    bet:number,
    gold:number,
    avatar:string,
    nickname:string,
    gender:number,
}
declare interface AnimPrefab{
    tomato:cc.Prefab,
    flower:cc.Prefab,
    boom:cc.Prefab,
    water:cc.Prefab,
    hand:cc.Prefab,
}
declare interface NodePoolData{
    prefab:cc.Prefab,
    pool:cc.NodePool,
}
declare interface SocketMessage{
    code:string;
    data:any;
}
declare interface SocketHeart{
    id:number;
    interval:number;
    isRec:boolean;
}
declare interface SocketReconnect{
    url:string;
    heartInterval:number;
    id:number;
    closeTime:number;
    isReconnect:boolean;
}
declare interface WebsocketMessage{
    (code:string,data:any):void;
}
     
declare class SwitchSp {
    /**
     * @description 设置显示的键值
     * @param key 
     */
    setSpriteFrame(key:number);
    /**
     * @description 更新目标键值得精灵
     * @param key 要更新的键值
     * @param spriteFrame 更新的精灵
     */
    updateFrame(key:number,spriteFrame:cc.SpriteFrame)
      /**
     * @description 更新目标键值得精灵
     * @param spriteFrame 新增的精灵
     * @retuen 返回增加精灵显示的键值失败时返回-1
     */
    pushFrame(spriteFrame:cc.SpriteFrame):number;
    /**
     * @description 获取当前显示的键值
     */
    getShowID():number;

}
