import AudioManager from "../units/AudioManager";
import SceneManager from "./SceneManager";

export default class MyAnimation{
    private static m_toastCurTween:cc.Tween;
    private static m_tweenMap:Map<number,cc.Tween> = new Map;
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
        cc.tween(Node).to(0.15,{scaleY:1.2,scaleX:1.2},{easing:'quadIn'}).to(0.1,{scaleY:1.0,scaleX:1.0},{easing:'quadIn'}).call(CallBack).start();
    }
    protected popupCloseScaleXY(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.scaleY = Node.scaleX = 1;
        Node.active = true;
        cc.tween(Node).to(0.1,{scaleY:1.2,scaleX:1.2},{easing:'quadOut'}).to(0.15,{scaleY:0,scaleX:0},{easing:'quadOut'}).call(CallBack).call(()=>{
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
        Node.getChildByName('toast').getChildByName('value').getComponent(cc.Label).string = str;
        if(Mask){
            Mask.active = true;
        }
        Node.parent.active = true;
        Node.active = true;
        Node.getChildByName('toast').active = true;
        if(cc.isValid(Node,true)){
            MyAnimation.m_toastCurTween =  cc.tween(Node.getChildByName('toast')).to(0.2,{scaleY:1.2,scaleX:1.2},{easing:'quadIn'}).to(0.1,{scaleY:1.0,scaleX:1.0},{easing:'quadIn'}).delay(1.0).to(0.7,{opacity:0},{easing:'quadOut'}).call(()=>{
                if(Mask){
                    Mask.active = false;
                }
                Node.getChildByName('toast').active = false;
                Node.getChildByName('toast').opacity = 255;
                callFunction();
            }).start();
        } 
    }
    protected OpenScaleX(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.parent.active = true;
        if(Mask){
            Mask.active = true;
        }
        Node.active = true;
        Node.scaleX = 0;
        cc.tween(Node).to(0.2,{scaleX:1},{easing:'quadIn'}).call(CallBack()).start();
    }
    protected CloseScaleX(Node:cc.Node,Mask:cc.Node = null,CallBack:Function = null){
        Node.parent.active = true;
        if(Mask){
            Mask.active = true;
        }
        Node.active = true;
        Node.scaleX = 1;
        cc.tween(Node).to(0.2,{scaleX:0},{easing:'quadOut'}).call(CallBack()).call(()=>{
            if(Mask){
                Mask.active = false;
            }
            Node.active = false;
        }).start();
    }
    protected movePos(ID:number,Node:cc.Node,MovePos:cc.Vec3,CallBack:Function = null){
        if(MyAnimation.m_tweenMap.get(ID)){
            MyAnimation.m_tweenMap.get(ID).stop();
        }
        MyAnimation.m_tweenMap.set(ID,cc.tween(Node).to(2,{x:MovePos.x,y:MovePos.y}).call(CallBack).call(()=>{MyAnimation.m_tweenMap.delete(ID)}).start()); 
    }
    protected  stopMovePos(ID:number){
        if(MyAnimation.m_tweenMap.get(ID)){
            MyAnimation.m_tweenMap.get(ID).stop();
        }
    }
    public static onDestory(){
        if(MyAnimation.m_toastCurTween){
            MyAnimation.m_toastCurTween.stop();
            MyAnimation.m_toastCurTween = null;
        }
        MyAnimation.m_tweenMap.forEach((tween,id)=>{
            tween.stop();
        })
    }
    protected noticeMove(){
        
    }
    protected StartRecordSgDetailRotation(ButtonNode:cc.Node,DetailNode,IsOpen:boolean,CallBack:Function = null){
        if(IsOpen){
            cc.tween(ButtonNode).to(0.2,{angle:90,color:new cc.Color(251,249,190)},{easing:'quadIn'}).call(CallBack).start();
            cc.tween(DetailNode).to(0.2,{scaleY:0,color:new cc.Color(251,249,190)},{easing:'quadIn'}).call(CallBack).call(()=>{
                DetailNode.active = false;
                DetailNode.scaleY = 1;
            }).start();
        }else{
            DetailNode.active = true;
            DetailNode.scaleY = 0;
            cc.tween(ButtonNode).to(0.2,{angle:0,color:new cc.Color(4,255,187)},{easing:'quadOut'}).call(CallBack).start();
            cc.tween(DetailNode).to(0.2,{scaleY:1},{easing:'quadOut'}).call(CallBack).start();
        }
    }
    protected ButtonIsChooseMove(ButtonNode:cc.Node,IsOpen:boolean,CallBack:Function = null){
        if(IsOpen){
            ButtonNode.getComponent('switchsp').setSpriteFrame(1);
            cc.tween(ButtonNode).to(0.1,{x:-5},{easing:'quadIn'}).call(CallBack).start();
        }else{
            ButtonNode.getComponent('switchsp').setSpriteFrame(0);
            cc.tween(ButtonNode).to(0.1,{x:-30},{easing:'quadOut'}).call(CallBack).start();
        }
    }
    protected RunAnimtation(Node:cc.Node,SendPos:cc.Vec3,ReciviePos){
        Node.active = true;
        let animation = Node.getComponent(cc.Animation);
        //注册回调//渐隐
        animation.on('finished',()=>{
            cc.tween(Node).to(0.5,{opacity:0},{easing:'quadOut'}).call(()=>{
                if(cc.isValid(Node,true)){
                    Node.destroy();
                }
            }).start();
        });
        //修改动画位置
        animation.defaultClip.curveData.props.position[0].value = [SendPos.x,SendPos.y,SendPos.z];
        animation.defaultClip.curveData.props.position[1].value = [ReciviePos.x,ReciviePos.y,ReciviePos.z];
        animation.play();
        setTimeout(()=>{
            if(SceneManager.getInstance().getSceneName() == 'game_sg'){
                let effCode:EFF_CODE;
                switch (Node.name){
                    case 'chicken':effCode = EFF_CODE.EFF_BQANIM_CHICKEN;break;
                    case 'tomato':effCode = EFF_CODE.EFF_BQANIM_TOMATO;break;
                    case 'flower':effCode = EFF_CODE.EFF_BQANIM_FLOWER;break;
                    case 'boom':effCode = EFF_CODE.EFF_BQANIM_BOOM;break;
                    case 'water':effCode = EFF_CODE.EFF_BQANIM_WATER;break;
                }
                AudioManager.getInstance().playEffectFromLocal(effCode,false);
            }
        },800)
    }
    protected RunBetAnim(Node:cc.Node,OnePos:cc.Vec2,TwoPos:cc.Vec2,callBack:Function){
        cc.tween(Node).to(0.2,{x:OnePos.x,y:OnePos.y},{easing:'quadOut'}).delay(0.5).to(0.4,{x:TwoPos.x,y:TwoPos.y},{easing:'quadOut'}).call(callBack).start();
    }
    protected RunOpenCard(Node:cc.Node){
        let swSp:SwitchSp = Node.getComponent('switchsp');
        if(!swSp){
            cc.warn('没有组件 switchsp');
            return;
        }
        cc.tween(Node).to(0.2,{scaleX:0}).call(()=>{
            swSp.setSpriteFrame(1);
        }).to(0.2,{scaleX:1}).start();
    }
}
