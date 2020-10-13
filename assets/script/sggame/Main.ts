// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "../common/SceneManager";
import Toast from "../common/Toast";
import SGView from "./SGView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
   //正式变量
   private cl_SGView:SGView;

    onLoad () {
        SceneManager.getInstance().setScene(cc.director.getScene());
        Toast.getInstance().setRootNode(cc.find('common/toast',this.node));
        this.cl_SGView = new SGView(this.node);
      
    }
   
    start () {
        this.cl_SGView.start();
    }
    // update (dt) {}
    onDestroy(){
        this.cl_SGView.onDestroy();
        this.cl_SGView = null;
    }
}
