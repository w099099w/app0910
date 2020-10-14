
export default class UserConfig{
    private BgmNameArr:string[];
    private EffNameArr:string[];
    private userinfo:UserInfo;
    private realNameInfo:RealNameInfo;
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
            'bgm/hzj'
        ];
        this.EffNameArr  =[
            'eff/animbq/chicken',
            'eff/animbq/tomato',
            'eff/animbq/flower',
            'eff/animbq/boom',
            'eff/animbq/water',
            'eff/card/send_card',
            'eff/newgame',
        ]
        this.userinfo = {
            gold:0,
            phone:'13345671231',
            avatar:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3087570435,2147751204&fm=26&gp=0.jpg',
            id:'12138',
            nickname:'虹之间',
            pd:'1233333333',
            parentID:'12137',
        }
        this.realNameInfo = {
            realname:'',
            idnumber:''
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
    public getRealNameInfo():RealNameInfo{
        return this.realNameInfo;
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
    public setUserInfo(Object:any){
        let userinfo:UserInfo = Object
        if(userinfo.gold){
            this.userinfo.gold = userinfo.gold;
        }
        if(userinfo.avatar){
            this.userinfo.avatar = userinfo.avatar;
        }
        if(userinfo.phone){
            this.userinfo.phone = userinfo.phone;
        }
        if(userinfo.id){
            this.userinfo.id = userinfo.id;
        }
        if(userinfo.parentID){
            this.userinfo.parentID = userinfo.parentID;
        }
        if(userinfo.nickname){
            this.userinfo.nickname = userinfo.nickname;
        }
    }
    public setRealNameInfo(RealName:RealName){
        this.realNameInfo.idnumber = RealName.idnumber;
        this.realNameInfo.realname = RealName.realname;
    }
    public setTableInfo(val:SanGongRuleInfo){
        this.TableInfo = val;
    }
}   
