import MyAnimation from "../../common/MyAnimation";
import SceneManager from "../../common/SceneManager";
import Toast from "../../common/Toast";
import AudioManager from "../../units/AudioManager";
import Tool from "../../units/Tool";
import UserConfig from "../../units/UserConfig";

export class MSet extends MyAnimation{
    private S_privateState:number;
    private S_quitLoginState:number;
    private U_privateUrl:string;

    public constructor(){
       super();
       //BUTTON_STATE.OFF;
       this.S_quitLoginState =  this.S_privateState = BUTTON_STATE.ON;
       this.U_privateUrl = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1029112456,3968662380&fm=26&gp=0.jpg'
    }

    public getprivateButtonState(){
        return this.S_privateState;
    }

    public getPrivateUrl(){
        return this.U_privateUrl;
    }
    public getQuitLoginButtonState(){
        return this.S_quitLoginState;
    }
}


export default class SetView extends MSet{
    private node:cc.Node;
    private m_toast:cc.Node;
    private m_mask:cc.Node;

    private m_root:cc.Node;
    private m_musicBarWidth:number;
    private m_effectBarWidth:number;
    private m_topMusicBar:cc.Node;
    private m_topEffectBar:cc.Node;
    private m_privateRoot:cc.Node;
    private m_privateSpriteNode:cc.Node;

    private i_confirm:cc.Node;
    private i_private:cc.Node;
    private i_close:cc.Node;
    private i_quitLogin:cc.Node;
    private i_iconMusic:cc.Node;
    private i_iconEffect:cc.Node;
    private i_sliderMusic:cc.Node;
    private i_sliderEffect:cc.Node;
    

    public constructor(Node:cc.Node){
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast',this.node);
        this.m_mask = cc.find('popup/mask',this.node);
        this.m_root = cc.find('popup/set',this.node);
        this.m_musicBarWidth = cc.find('popup/set/layout_music/progress/bar',this.node).width;
        this.m_effectBarWidth = cc.find('popup/set/layout_eff/progress/bar',this.node).width;
        this.m_topMusicBar = cc.find('popup/set/layout_music/progress/bar',this.node);
        this.m_topEffectBar = cc.find('popup/set/layout_eff/progress/bar',this.node);
        this.i_private = cc.find('popup/set/button_private',this.node);
        this.i_close = cc.find('popup/set/button_close',this.node);
        this.i_quitLogin = cc.find('popup/set/button_quitlogin',this.node);
        this.i_iconMusic = cc.find('popup/set/layout_music/icon_music',this.node);
        this.i_iconEffect = cc.find('popup/set/layout_eff/icon_eff',this.node);
        this.i_sliderMusic = cc.find('popup/set/layout_music/progress',this.node);
        this.i_sliderEffect = cc.find('popup/set/layout_eff/progress',this.node);
        this.m_privateRoot = cc.find('popup/set/private',this.node);
        this.i_confirm = cc.find('popup/set/private/button_confirm',this.node);
        this.m_privateSpriteNode = cc.find('popup/set/private/scrollview/view/content/item',this.node);
        this.m_root.active = this.m_privateRoot.active = false;
        this.setView();
    }
    public click_PrivateRoom(){
        switch(this.getprivateButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.showPrivate();break;
        }
    } 
    public click_QuitLogin(){
        switch(this.getQuitLoginButtonState()){
            case BUTTON_STATE.OFF:Toast.getInstance().show('暂未开放!',this.m_toast);break;
            case BUTTON_STATE.ON:this.hideEvent();SceneManager.getInstance().loadScene('passport');break;
        }
    }    
    public show(){
        this.popupOpenScaleXY(this.m_root,this.m_mask,this.addEvent.bind(this));
    }
    public hide(){
        this.popupCloseScaleXY(this.m_root,this.m_mask,this.hideEvent.bind(this));
    }
    public addPrivateEvent(){
        this.i_confirm.on('touchend',()=>{
            this.hidePrivate();
        },this);
    }
    public hidePrivateEvent(){
        this.i_confirm.off('touchend');
    }
    public showPrivate(){
        this.setPrivateView();
        this.popupOpenScaleY(this.m_privateRoot,null,this.addPrivateEvent.bind(this));
    }
    public hidePrivate(){
        this.popupCloseScaleY(this.m_privateRoot,null,this.hidePrivateEvent.bind(this));
    }
    public hideEvent(){
        this.i_private.off('touchend');
        this.i_quitLogin.off('touchend');
        this.i_sliderMusic.off('slide');
        this.i_sliderEffect.off('slide');
        this.i_iconMusic.off('touchend');
        this.i_iconEffect.off('touchend');
        this.i_close.off('touchend');
    }
    public addEvent(){
        this.i_private.on('touchend',()=>{
            this.click_PrivateRoom();
        },this)
        this.i_quitLogin.on('touchend',()=>{
            this.click_QuitLogin();
        },this)
        this.i_sliderMusic.on('slide',()=>{
            UserConfig.getInstance().setBgmVolConfig(this.i_sliderMusic.getComponent(cc.Slider).progress);
            this.setView();
        });
        this.i_sliderEffect.on('slide',()=>{
            UserConfig.getInstance().setEffVolConfig(this.i_sliderEffect.getComponent(cc.Slider).progress);
            this.setView();
        });
        this.i_iconMusic.on('touchend',()=>{
            UserConfig.getInstance().setBgmState(!UserConfig.getInstance().getAudioConfig().openBgm);
            AudioManager.getInstance().setBgmVol(UserConfig.getInstance().getAudioConfig().openBgm?UserConfig.getInstance().getAudioConfig().bgmVol:0);
            this.setView();
        },this);
        this.i_iconEffect.on('touchend',()=>{
            UserConfig.getInstance().setEffState(!UserConfig.getInstance().getAudioConfig().openEff);
            AudioManager.getInstance().setEffVol(UserConfig.getInstance().getAudioConfig().openEff?UserConfig.getInstance().getAudioConfig().effVol:0);
            this.setView();
        },this);
        this.i_close.on('touchend',()=>{
            this.hide();
        },this);
    }
    public setPrivateView(){
        this.m_privateSpriteNode.getComponent(cc.Sprite).spriteFrame = null;
        Tool.getInstance().LoadImageRemote(this.m_privateSpriteNode,this.getPrivateUrl());
    }

    public setView(){
        let Audio:AUDIO = UserConfig.getInstance().getAudioConfig();
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

