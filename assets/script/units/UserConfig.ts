
export default class UserConfig{
    private _balance:Balance;
    get balance():Balance{
        return this._balance;
    }
    private BgmNameArr:string[];
    private EffNameArr:string[];
    private userinfo:UserInfo;
    private _realNameInfo:RealNameInfo;
    get realNameInfo():RealNameInfo{
        return this._realNameInfo;
    }
    private AudioConfig:AUDIO;
    private static m_instance:UserConfig;
    private TableInfo:SanGongRuleInfo;
    private constructor(){
        if(cc.sys.localStorage.getItem('rememberAudio')){
            this.AudioConfig = JSON.parse(cc.sys.localStorage.getItem('rememberAudio'));
        }else{
            this.AudioConfig = {
                openBgm:true,
                openEff:true,
                bgmVol:1,
                effVol:1
            };
        }
        this.BgmNameArr = [
            '',
            'bgm/hzj',
            '',
            '',
            'bgm/gtm'
        ];
        this.EffNameArr  =[
            'eff/animbq/chicken',
            'eff/animbq/tomato',
            'eff/animbq/flower',
            'eff/animbq/boom',
            'eff/animbq/water',
            'eff/card/send_card',
            'eff/newgame',
            'eff/gold/add_gold',
            'eff/gold/sub_gold',
        ]
        this.userinfo = {
            member_id:10000,
            parent_id:10000,
            shareholder_id:11,
            is_agent:1,
            is_real:1,
            mobile:'13345671231',
            avatar:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3087570435,2147751204&fm=26&gp=0.jpg',
            nickname:'虹之间',
            username:'13345671231',
            pd:'',
        }
        this._realNameInfo = {
            member_id:0,
            real_name:'',
            id_card:''
        }
        this._balance = {
            block_rmb:0,
            withdrawal_rmb:0,
            rmb:0
        }
    }
    public static getInstance():UserConfig{
        if(!UserConfig.m_instance){
            UserConfig.m_instance = new UserConfig();
            return UserConfig.m_instance;
        }
        return UserConfig.m_instance;
    }
    public getAudioConfig():AUDIO{
        return this.AudioConfig;
    }
    public getBgmNameFronCode(BgmCode:BGM_CODE):string{
        return this.BgmNameArr[BgmCode];
    }
    public getEffNameFronCode(EffCode:EFF_CODE):string{
        return this.EffNameArr[EffCode];
    }
    public getUserInfo():UserInfo{
        return this.userinfo;
    }
    public getTableInfo():SanGongRuleInfo{
        return this.TableInfo;
    }
    public getSgSetViewConfig():SgSetView{
        if(cc.sys.localStorage.getItem('sgSetView')){
            return JSON.parse(cc.sys.localStorage.getItem('sgSetView'));
        }else{
            return {tableid:0,cardid:0};
        }
    }
    public setSgSetViewConfig(SgSetView:SgSetView){
        cc.sys.localStorage.setItem('sgSetView',JSON.stringify(SgSetView));
    }
    public setBgmVolConfig(Vol:number){
        if(Vol < 0 || Vol > 1){
            return;
        }
        this.AudioConfig.bgmVol = Vol;
    }
    public setEffVolConfig(Vol:number){
        if(Vol < 0 || Vol > 1){
            return;
        }
        this.AudioConfig.effVol = Vol;
    }
    public setBgmState(State:boolean){
        this.AudioConfig.openBgm = State;
    }
    public setEffState(State:boolean){
        this.AudioConfig.openEff = State;
    }
    public saveMusicConfig(){
        cc.sys.localStorage.setItem('rememberAudio',JSON.stringify(this.AudioConfig));
    }   
    public setTableInfo(val:SanGongRuleInfo){
        this.TableInfo = val;
    }



    public setRealName(RealName:RealNameInfo){
        this._realNameInfo = RealName;
    }
    public setBalance(val:Balance){
        if(typeof val.rmb !== 'undefined'){
            this._balance.rmb = val.rmb;
        }
        if(typeof val.block_rmb !== 'undefined'){
            this._balance.block_rmb = val.block_rmb;
        }
        if(typeof val.withdrawal_rmb !== 'undefined'){
            this._balance.withdrawal_rmb = val.withdrawal_rmb;
        }
    }
    public setUserInfo(Object:any){
        let userinfo:UserInfo = Object
        if(userinfo.avatar){
            this.userinfo.avatar = userinfo.avatar;
        }
        if(userinfo.mobile){
            this.userinfo.mobile = userinfo.mobile;
        }
        if(userinfo.member_id){
            this.userinfo.member_id = userinfo.member_id;
        }
        if(typeof userinfo.parent_id !== 'undefined'){
            this.userinfo.parent_id = userinfo.parent_id;
        }
        if(userinfo.nickname){
            this.userinfo.nickname = userinfo.nickname;
        }
        if(userinfo.username){
            this.userinfo.username = userinfo.nickname;
        }
        if(userinfo.is_agent){
            this.userinfo.is_agent = userinfo.is_agent;
        }
        if(userinfo.is_real){
            this.userinfo.is_real = userinfo.is_real;
        }
        if(userinfo.shareholder_id){
            this.userinfo.shareholder_id = userinfo.shareholder_id;
        }
        if(userinfo.pd){
            this.userinfo.pd = userinfo.pd;
        }
    }
}   
