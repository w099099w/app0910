import MyAnimation from "../../common/MyAnimation";
import Toast from "../../common/Toast";
import Tool from "../../units/Tool";

export class MShareView extends MyAnimation {
    private S_closeState: number;
    private S_saveImageState: number;
    private S_copyCodeState: number;
    private m_pathRoot: string;
    private m_shareCode: string;
    protected m_width: number;
    protected m_hight: number;
    protected m_texture:cc.RenderTexture;

    protected m_touchend: boolean;

    public constructor() {
        super();
        this.m_shareCode = 'PC121387';
        this.S_saveImageState = BUTTON_STATE.ON;
        this.S_copyCodeState = BUTTON_STATE.ON;
        this.S_closeState = BUTTON_STATE.ON;
    }


    public setImagePathRoot() {
        if (cc.sys.isNative && CC_JSB && cc.sys.os === cc.sys.OS_ANDROID) {
            let sigs = '()Ljava/lang/String;';
            this.m_pathRoot = jsb.reflection.callStaticMethod(className, 'getImagePathRoot', sigs);
            return;
        }
        this.m_pathRoot = '/storage/emulated/0/DCIM/Screenshots/';
    }
    public getShareCode() {
        return this.m_shareCode;
    }
    public getImagePathRoot() {
        return this.m_pathRoot;
    }

    public getCloseButtonState() {
        return this.S_closeState;
    }

    public getSaveImageButtonState() {
        return this.S_saveImageState;
    }
    public getCopyCodeButtonState() {
        return this.S_copyCodeState;
    }
    public savePic(PicData: Uint8Array) {
        if (cc.sys.isNative && CC_JSB && PicData) {
            let path = this.m_pathRoot;
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                let time = new Date();
                let fileName: string = time.getFullYear().toString() + (time.getMonth() + 1) + time.getDate() + '_' + time.getHours() + time.getMinutes() + time.getSeconds() + '.png';
                if (!jsb.fileUtils.isDirectoryExist(path)) {
                    jsb.fileUtils.createDirectory(path);//创建目录
                }
                let saveDCIM = jsb.saveImageData(PicData, this.m_width, this.m_hight, path + fileName);
                if (saveDCIM) {
                    let sigs = '(Ljava/lang/String;)V';
                    jsb.reflection.callStaticMethod(className, 'noticeImageMedia', sigs, path + fileName);
                }
                return saveDCIM;
            } else if (cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os === String(cc.sys.DESKTOP_BROWSER)) {
                !CC_JSB || CC_DEBUG ? console.log('图片存储成功存储路径:' + path) : null;
                return true;
            }
        }
        return true;
    }
    public filpYImage(data){
        let width =  this.m_width; 
        let height = this.m_hight;
        // create the data array
        let picData = new Uint8Array(width * height * 4)
        let rowBytes = width * 4
        for (let row = 0; row < height; row++) {
          let srow = height - 1 - row
          let start = srow * width * 4
          let reStart = row * width * 4
          // save the piexls data
          for (let i = 0; i < rowBytes; i++) {
            picData[reStart + i] = data[start + i]
          }
        }
        return picData
    }
}


export default class ShareView extends MShareView {
    private node: cc.Node;
    private m_toast: cc.Node;
    private m_root: cc.Node;
    private m_mask: cc.Node;
    private m_camera: cc.Node;

    private i_closeView: cc.Node;
    private i_saveImage: cc.Node;
    private i_copyCode: cc.Node;
    private c_camera: cc.Camera;

    private c_qrcode: cc.Sprite

    public constructor(Node: cc.Node) {
        super();
        this.node = Node;
        this.m_toast = cc.find('common/toast', this.node);

        this.m_mask = cc.find('popup/mask', this.node);
        this.m_root = cc.find('popup/share', this.node);
        this.i_closeView = cc.find('popup/share/button_close', this.node);
        this.i_saveImage = cc.find('popup/share/button_saveImage', this.node);
        this.i_copyCode = cc.find('popup/share/sharecode/button_copy', this.node);

        this.c_qrcode = cc.find('popup/share/frame/qr_frame/mask/qrcode', this.node).getComponent(cc.Sprite);

        this.setImagePathRoot();
        this.initCrema();
        this.m_mask.active = false;
        this.m_root.active = false;
        this.addEvent();
    }

    private initCrema() {
        this.m_touchend = true;
        this.m_camera = new cc.Node();
        this.node.addChild(this.m_camera);//主节点Canvas添加节点
        this.m_camera.x = this.m_camera.y = 0;
        this.c_camera = this.m_camera.addComponent(cc.Camera); //添加摄像机
        this.c_camera.cullingMask = -2;// 设置你想要的截图内容的 cullingMask
        this.m_camera.active = false;
    }
    public createTex(){
        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        this.m_camera.active = true;
        let texture:cc.RenderTexture = new cc.RenderTexture();
        let gl:any = cc.game._renderContext;
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        texture.initWithSize(807, 543, gl.STENCIL_INDEX8);
        this.c_camera.targetTexture = texture;
        this.m_texture = texture;//保存纹理
    }
    public createSprite(){
        let blinkAction = cc.blink(0.3, 1)
        this.node.runAction(blinkAction);//闪屏
      
        let data = this.m_texture.readPixels()
        this.m_width = this.m_texture.width
        this.m_hight = this.m_texture.height
        let picData:Uint8Array = this.filpYImage(data);
        if(!this.savePic(picData)){
            return;//存储图片到本地失败则return;
        }
        //创建精灵
        let share_texture = new cc.Texture2D()
        share_texture.initWithData(picData, 32, this.m_width, this.m_hight)
    
        let spriteFrame = new cc.SpriteFrame()
        spriteFrame.setTexture(share_texture)
        let showNode:cc.Node = new cc.Node()
        let sprite = showNode.addComponent(cc.Sprite)
        showNode.addComponent(cc.BlockInputEvents);
        sprite.spriteFrame = spriteFrame
    
        showNode.zIndex = cc.macro.MAX_ZINDEX
        this.node.addChild(showNode);
        let width = cc.winSize.width
        let height = cc.winSize.height
        showNode.x = showNode.y = 0
       
        let targetPos:cc.Vec3 = cc.v3(width/2 - (0.3*(showNode.width/2)),  height/2 - (0.3*(showNode.height/2)),0);
        cc.tween(showNode).to(0.7,{position: targetPos, scale:0.3},{ easing: 'quadIn'}).delay(2).call(()=>{
            showNode.destroy()
            picData = null;
            showNode = null;
            this.m_camera.active = false;
            this.m_touchend = true;
            if(cc.sys.os == cc.sys.OS_IOS){
                Toast.getInstance().show('请手动截图分享!', this.m_toast);
            }
        }).start();
    }
    public show() {
        this.m_root.parent.active = true;
        this.popupOpenScaleXY(this.m_root, this.m_mask);
    }
    public hide() {
        this.popupCloseScaleXY(this.m_root, this.m_mask);
    }
    public click_SaveImage() {
        switch (this.getSaveImageButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('暂未开放!', this.m_toast); break;
            case BUTTON_STATE.ON: {
                if(this.m_touchend){
                    this.createTex();
                    setTimeout(()=>{
                        this.createSprite();
                    },1000);
                    this.m_touchend = false;
                }else{
                    Toast.getInstance().show('请等待截图完成!', this.m_toast);
                }
            }; break;
        }
    }
    public click_CopyCode() {
        switch (this.getCopyCodeButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('暂未开放!', this.m_toast); break;
            case BUTTON_STATE.ON: {
                if (cc.sys.isNative) {
                    jsb.copyTextToClipboard(this.getShareCode());
                }
                Toast.getInstance().show('分享码复制成功!', this.m_toast, false);
            }; break;
        }
    }
    public click_Close() {
        switch (this.getCloseButtonState()) {
            case BUTTON_STATE.OFF: Toast.getInstance().show('暂未开放!', this.m_toast); break;
            case BUTTON_STATE.ON: { this.hide(); }; break;
        }
    }
    private addEvent() {
        this.i_closeView.on('touchend', () => {
            this.click_Close();
        }, this)
        this.i_saveImage.on('touchend', () => {
            this.click_SaveImage();
        }, this)
        this.i_copyCode.on('touchend', () => {
            this.click_CopyCode();
        }, this)
    }
    public start() {

    }
    public onDestory(){
        
    }
}

