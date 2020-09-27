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
declare enum BGM_CODE{
    BGM_NONE,
    BGM_PASSPORT,
    BGM_HALL,
}
declare enum EFF_CODE{
   
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

//网络接口
declare interface VerifyPhone {
    phone: string;
}
declare interface ForgetPD{
    phone:string;
    verify:string;
    newPd:string;
    repeatPd:string;
}
declare interface PdLogin {
    phone: string;
    password: string;
}
declare interface VerifyLogin {
    phone: string;
    verify: string;
}

declare interface RegistRequest{
    invateCode:string,
    phone:string;
    verify:string;
    newPd:string;
    repeatPd:string;
}

declare interface ChangeName{
	nickname:string;
}

declare interface ResetPd{
	oldPd:string;
	newPd:string;
	confirmPd:string;
}
declare interface RealName{
	realname:string;
	idnumber:string;
}
declare interface MoneyFlow{
	page:number;
	limit:number;
}


//网络接收接口
declare interface PlayInfo{
    tittle:string;
    contentUrl:string;
}
declare interface MsgInfo{
    tittle:string;
    content:string;
}
declare interface RealNameInfo{
	realname:string;
	idnumber:string;
}
declare interface MoneyFlowInfo{
	orderid:string;
	before:number;
	amount:number;
	after:number;
	type:number;
	date:string;
}

//其他接口(可改接为类方法)
declare interface AUDIO{
    openBgm:boolean;
    openEff:boolean;
    bgmVol:number;
    effVol:number;
}
declare interface UserInfo{
    gold:number,
    phone:string,
    avatar:string,
    nickname:string,
    pd:string,
    id:string,
    parentID:string,
}
declare interface HallPrefabArr{
    PopupLeftButton:cc.Prefab;
    otherL:cc.Prefab,
}

declare interface ForeachPlayInfo{
    (Tittle:string,contentUrl:string,Index:number):any;
}

declare interface ForeachMsgInfo{
    (Tittle:string,contentUrl:string,Index:number):any;
}