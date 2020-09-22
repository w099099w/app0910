import UserConfig from "./UserConfig";

enum BgmCode {
    BGM_NONE,
    BGM_PASSPORT,
    BGM_HALL,
}
enum EffCode {

}
export default class AudioManager {
    private static m_instance: AudioManager;
    private static m_bgmCode: BgmCode;
    public static getInstance() {
        if (!AudioManager.m_instance) {
            AudioManager.m_instance = new AudioManager();
            AudioManager.m_bgmCode = BgmCode.BGM_NONE;
        }
        return AudioManager.m_instance;
    }
    public playBgmFromURL(url, isLook = true) {
        if (UserConfig.getInstance().getAudioConfig().openBgm) {
            cc.audioEngine.stopMusic();
            cc.assetManager.loadRemote(url, function (err, audioClip: cc.AudioClip) {
                if (!err) {
                    cc.audioEngine.setMusicVolume(UserConfig.getInstance().getAudioConfig().bgmVol);
                    cc.audioEngine.playMusic(audioClip, isLook);
                }
            });
        }
    }
    public playEffect(url, isLook = false) {
        if (UserConfig.getInstance().getAudioConfig().openEff) {
            cc.assetManager.loadRemote(url, function (err, audioClip: cc.AudioClip) {
                if (!err) {
                    cc.audioEngine.setEffectsVolume(UserConfig.getInstance().getAudioConfig().effVol);
                    cc.audioEngine.playEffect(audioClip, isLook);
                }
            });
        }
    }
    /**
    * @description: 播放本地背景音
    * @param {cc.Enum} srccode 音频文件枚举
    * @param {boolean} isLook 是否循环播放
    */
    public playBgmFromLocal(srccode: BgmCode, isLook = false) {
        cc.audioEngine.stopMusic();
        AudioManager.m_bgmCode = srccode;
        cc.resources.load(UserConfig.getInstance().getBgmNameFronCode(srccode), cc.AudioClip, function (err, clip:cc.AudioClip) {
            cc.audioEngine.setMusicVolume(UserConfig.getInstance().getAudioConfig().bgmVol);
            return cc.audioEngine.playMusic(clip, isLook);
        });
    }
    /**
    * @description: 播放本地音效
    * @param {cc.Enum} srccode 音频文件枚举
    * @param {boolean} isLook 是否循环播放
    */
    public playEffectFromLocal(srccode: EffCode, isLook = false) {
        cc.resources.load(UserConfig.getInstance().getEffNameFronCode(srccode), cc.AudioClip, function (err, clip:cc.AudioClip) {
            cc.audioEngine.setEffectsVolume(UserConfig.getInstance().getAudioConfig().effVol);
            return cc.audioEngine.playEffect(clip, isLook);
        });
    }
    /**
    * @description: 是否在播放背景音乐
    * @return {boolean}
    */
    public isMusicPlaying() {
        return cc.audioEngine.isMusicPlaying();
    }
    /**
    * @description: 获取当前播放的背景音乐枚举
    * @return {Number}
    */
    public getBgmCode() {
        return AudioManager.m_bgmCode;
    }
    public stopBgm() {
        if (this.isMusicPlaying()) {
            AudioManager.m_bgmCode = BgmCode.BGM_NONE;
            cc.audioEngine.stopMusic();
        }
    }
    public stopAll() {
        cc.audioEngine.stopAll();
    }
    public stopEff(Effid: number) {
        cc.audioEngine.stopEffect(Effid);
    }
    public pauseBgm() {
        cc.audioEngine.pauseMusic();
    }
    public resumeBgm() {
        cc.audioEngine.resumeMusic();
    }
    public setBgmVol(vol:number = null) {
        cc.audioEngine.setMusicVolume(vol || vol === 0 ? vol : UserConfig.getInstance().getAudioConfig().bgmVol);
    }
    public setEffVol(vol:number = null) {
        cc.audioEngine.setEffectsVolume(vol || vol === 0 ? vol : UserConfig.getInstance().getAudioConfig().effVol);
    }
}

