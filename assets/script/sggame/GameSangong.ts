// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   private bgIndex:number; 
   private cdIndex:number; 
   public switch(){
        this.bgIndex+=1;
        if(this.bgIndex > 3){
            this.bgIndex = 0;
        }
        this.switchBg();
        this.switchcard();
   }
   private switchBg(){
        this.node.getComponent('switchsp').setSpriteFrame(this.bgIndex)
   }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        this.bgIndex = 0;
        this.cdIndex = 0;
    }
    public switchcard(){
        this.cdIndex += 1;
        if(this.cdIndex > 3){
            this.cdIndex = 0;
        }
        this.node.getChildByName('player').children.forEach((item,key)=>{
            if(key == 0){
                item.getChildByName('cardList').children.forEach(element => {
                    element.getComponent('switchsp').setSpriteFrame(this.bgIndex);
                    element.width = 83;
                    element.height = 111; 
                });
            }else{
                item.getChildByName('cardList').children.forEach(element => {
                    element.getComponent('switchsp').setSpriteFrame(this.bgIndex);
                    element.width = 57;
                    element.height = 76; 
                });
            }
        },this);
    }
    public goRoom(){
        SceneManager.getInstance().loadScene('room');
    }

    start () {

    }

    // update (dt) {}
}
