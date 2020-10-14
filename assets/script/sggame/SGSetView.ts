import AtlasLib from "../common/AtlasLib";
import MyAnimation from "../common/MyAnimation";
import AudioManager from "../units/AudioManager";
import UserConfig from "../units/UserConfig";
import CardLib from "./CardLib";

export class MSet extends MyAnimation{

    public constructor(){
       super();
    }
    public getSgSetViewConfig():SgSetView{
        return UserConfig.getInstance().getSgSetViewConfig();
    }
    public setSgSetViewConfig(val:SgSetView){
        UserConfig.getInstance().setSgSetViewConfig(val);
    }
    protected getAudioConfig():AUDIO{
        return UserConfig.getInstance().getAudioConfig();
    }
}


export default class SGSetView extends MSet{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;
    private m_playerList:cc.Node[];
    private m_table:SwitchSp;

    private m_root:cc.Node;
    private m_musicBarWidth:number;
    private m_effectBarWidth:number;
    private m_topMusicBar:cc.Node;
    private m_topEffectBar:cc.Node;
    private m_cardSelect:cc.Node;
    private m_tableSelect:cc.Node;

    private i_close:cc.Node;
    private i_iconMusic:cc.Node;
    private i_iconEffect:cc.Node;
    private i_sliderMusic:cc.Node;
    private i_sliderEffect:cc.Node;
    private i_cardSelect:cc.Node[];
    private i_tableSelect:cc.Node[];

    private cl_cardLib:CardLib;
    

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root = cc.find('popup/set',this.node);
        
        this.m_playerList = cc.find('player',this.node).children;
        this.m_table = this.node.getComponent('switchsp');
        this.m_musicBarWidth = cc.find('popup/set/layout_music/progress/bar',this.node).width;
        this.m_effectBarWidth = cc.find('popup/set/layout_eff/progress/bar',this.node).width;
        this.m_topMusicBar = cc.find('popup/set/layout_music/progress/bar',this.node);
        this.m_topEffectBar = cc.find('popup/set/layout_eff/progress/bar',this.node);
        this.m_cardSelect = cc.find('popup/set/layout_card/isok',this.node);
        this.m_tableSelect = cc.find('popup/set/layout_table/isok',this.node);

        this.i_close = cc.find('popup/set/button_close',this.node);
        this.i_iconMusic = cc.find('popup/set/layout_music/icon_music',this.node);
        this.i_iconEffect = cc.find('popup/set/layout_eff/icon_eff',this.node);
        this.i_sliderMusic = cc.find('popup/set/layout_music/progress',this.node);
        this.i_sliderEffect = cc.find('popup/set/layout_eff/progress',this.node);
        this.i_cardSelect = cc.find('popup/set/layout_card',this.node).children;
        this.i_tableSelect = cc.find('popup/set/layout_table',this.node).children;

        this.cl_cardLib = cc.find('state/cardLib',this.node).getComponent(CardLib);
        
        this.m_root.active = true;
        this.updateView();
        this.setChoose(this.getSgSetViewConfig());
        this.m_cardSelect.position = this.i_cardSelect[this.getSgSetViewConfig().cardid+1].position;
        this.m_tableSelect.position = this.i_tableSelect[this.getSgSetViewConfig().tableid+1].position;
        this.m_root.active = false;
    }
    private setChoose(val:SgSetView){
        this.m_playerList.forEach((item,key)=>{
            item.getChildByName('cardList').children.forEach((citem)=>{
                let width:number = citem.width;
                let height:number = citem.height;
                let SwitchSp:SwitchSp = citem.getComponent('switchsp');
                SwitchSp.updateFrame(0,AtlasLib.getInstance().getSpriteFrame('card','base'+val.cardid));
                citem.width = width;
                citem.height = height;
            },this);
        },this);
        this.m_table.setSpriteFrame(val.tableid);
        this.cl_cardLib.setCardBase(0,AtlasLib.getInstance().getSpriteFrame('card','base'+val.cardid));
    }
    private click_CardChoose(item:cc.Node,key:number){
       let Savedata:SgSetView = this.getSgSetViewConfig();
       this.m_cardSelect.position = item.position;
       this.m_cardSelect.active = true;
       this.setSgSetViewConfig({cardid:key-1,tableid:Savedata.tableid});
       this.setChoose({cardid:key-1,tableid:Savedata.tableid});
    } 
    private click_TableChoose(item:cc.Node,key:number){
        let Savedata:SgSetView = this.getSgSetViewConfig();
       this.m_tableSelect.position = item.position;
       this.m_tableSelect.active = true;
       this.setSgSetViewConfig({cardid:Savedata.cardid,tableid:key-1});
       this.setChoose({cardid:Savedata.cardid,tableid:key-1});
    }    
    public show(){
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }
    private hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    private hideEvent(){
        this.i_sliderMusic.off('slide');
        this.i_sliderEffect.off('slide');
        this.i_iconMusic.off('touchend');
        this.i_iconEffect.off('touchend');
        this.i_close.off('touchend');
    }
    private addEvent(){
        this.i_sliderMusic.on('slide',()=>{
            UserConfig.getInstance().setBgmVolConfig(this.i_sliderMusic.getComponent(cc.Slider).progress);
            this.updateView();
        });
        this.i_sliderEffect.on('slide',()=>{
            UserConfig.getInstance().setEffVolConfig(this.i_sliderEffect.getComponent(cc.Slider).progress);
            this.updateView();
        });
        this.i_iconMusic.on('touchend',()=>{
            UserConfig.getInstance().setBgmState(!UserConfig.getInstance().getAudioConfig().openBgm);
            AudioManager.getInstance().setBgmVol(UserConfig.getInstance().getAudioConfig().openBgm?UserConfig.getInstance().getAudioConfig().bgmVol:0);
            this.updateView();
        },this);
        this.i_iconEffect.on('touchend',()=>{
            UserConfig.getInstance().setEffState(!UserConfig.getInstance().getAudioConfig().openEff);
            AudioManager.getInstance().setEffVol(UserConfig.getInstance().getAudioConfig().openEff?UserConfig.getInstance().getAudioConfig().effVol:0);
            this.updateView();
        },this);
        this.i_close.on('touchend',()=>{
            this.hide();
        },this);
        this.i_cardSelect.forEach((item,key)=>{
            if(item.name !== 'icon' && item.name !== 'isok'){
                item.on('touchend',()=>{
                    this.click_CardChoose(item,key);
                })
            }
        },this);
        this.i_tableSelect.forEach((item,key)=>{
            if(item.name !== 'icon' && item.name !== 'isok'){
                item.on('touchend',()=>{
                    this.click_TableChoose(item,key);
                })
            }
        },this);
        this.updateView();
    }

    private updateView(){
        let Audio:AUDIO = this.getAudioConfig();
        //显示控制
        this.i_iconMusic.getComponent('switchsp').setSpriteFrame(Audio.openBgm === false?0:1);
        this.i_iconEffect.getComponent('switchsp').setSpriteFrame(Audio.openEff === false?0:1);
        if(!Audio.openBgm){
            this.i_sliderMusic.getComponent(cc.Slider).progress = 0;
        }else{
            AudioManager.getInstance().setBgmVol();
            this.i_sliderMusic.getComponent(cc.Slider).progress = Audio.bgmVol;
        }
        if(!Audio.openEff){
            this.i_sliderEffect.getComponent(cc.Slider).progress = 0;
        }else{
            AudioManager.getInstance().setEffVol();
            this.i_sliderEffect.getComponent(cc.Slider).progress = Audio.effVol;
        }
        this.m_topMusicBar.width = this.i_sliderMusic.getComponent(cc.Slider).progress*this.m_musicBarWidth;
        this.m_topEffectBar.width = this.i_sliderEffect.getComponent(cc.Slider).progress*this.m_effectBarWidth;
        UserConfig.getInstance().saveMusicConfig();
        cc.sys.localStorage.setItem('music',JSON.stringify(Audio));
    }
    public start(){
        
    }
    public onDestory(){
        
    }
}

