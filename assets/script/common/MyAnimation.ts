
export default class MyAnimation{
    private static m_toastCurTween:cc.Tween;
     /**
     * @description 标准弹窗效果缩放XY轴
     * @param Node 主缩放节点
     * @param Mask 遮罩
     * @param CallBack 完成后执行的回调函数
     */
    protected popupOpenScaleXY(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.scaleY = Node.scaleX = 0;
        Node.active = true;
        if(Mask){
            Mask.active = true;
        }
        cc.tween(Node).to(0.2,{scaleY:1.3,scaleX:1.3},{easing:'quadIn'}).to(0.1,{scaleY:1.0,scaleX:1.0},{easing:'quadIn'}).call(CallBack).start();
    }
    protected popupCloseScaleXY(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.scaleY = Node.scaleX = 1;
        Node.active = true;
        cc.tween(Node).to(0.1,{scaleY:1.3,scaleX:1.3},{easing:'quadOut'}).to(0.2,{scaleY:0,scaleX:0},{easing:'quadOut'}).call(CallBack).call(()=>{
            if(Mask){
                Mask.active = false;
            }
            Node.active = false;
        }).start();
    }
    protected popupOpenScaleY(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.parent.active = true;
        if(Mask){
            Mask.active = true;
        }
        Node.active = true;
        Node.scaleY = 0;
        cc.tween(Node).to(0.2,{scaleY:1},{easing:'quadIn'}).call(CallBack).start();
    }
    protected popupCloseScaleY(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.parent.active = true;
        Node.active = true;
        Node.scaleY = 1;
        cc.tween(Node).to(0.2,{scaleY:0},{easing:'quadOut'}).call(CallBack).call(()=>{
            if(Mask){
                Mask.active = false;
                Node.active = false;
            }
        }).start();
    }
    protected toastFadeIn(str:string,Node:cc.Node,Mask:cc.Node,callFunction:Function = null){
        Node.getChildByName('value').getComponent(cc.Label).string = str;
        if(Mask){
            Mask.active = true;
        }
        Node.parent.active = true;
        Node.active = true;
        if(cc.isValid(Node,true)){
            MyAnimation.m_toastCurTween =  cc.tween(Node).to(0.2,{scaleY:1.2,scaleX:1.2},{easing:'quadIn'}).to(0.1,{scaleY:1.0,scaleX:1.0},{easing:'quadIn'}).delay(1.0).to(0.7,{opacity:0},{easing:'quadOut'}).call(()=>{
                if(Mask){
                    Mask.active = false;
                }
                Node.active = false;
                Node.opacity = 255;
                callFunction();
            }).start();
        } 
    }
    public static onDestory(){
        if(MyAnimation.m_toastCurTween){
            MyAnimation.m_toastCurTween.stop();
            MyAnimation.m_toastCurTween = null;
        }
    }  
}
