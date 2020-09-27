// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Passport from "../passport/Passoprt";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListOpacity extends cc.Component {

    private scrollview:cc.Node;
    private content:cc.Node;
    private view:cc.Node;
    onLoad () {
        this.scrollview = this.node;
        this.content = cc.find('view/content',this.node);
        this.view = cc.find('view',this.node);
        if(!this.scrollview || !this.view || !this.content){
            cc.error('节点不符合要求scorllview\n -view\n  -content');
        }
    }

    onEnable(){
        this.scrollview.on('scrolling',this.setListOpcaty.bind(this));
        this.content.on('size-changed',this.setListOpcaty.bind(this));
    }

    start () {
        
    }
    setListOpcaty(){
        let length = this.content.children.length
        let viewRect = cc.rect(- this.view.width / 2, - this.content.y - this.view.height, this.view.width, this.view.height);
        for (let i = 0; i < length; i++) {
            const node = this.content.children[i];
            if (viewRect.intersects(node.getBoundingBox())) {
                node.opacity = 255;
            }
            else {
                node.opacity = 0;
            }
        }
    }
    onDestroy(){
        this.scrollview.off('scrolling');
        this.content.off('size-changed');
    }
    // update (dt) {}
}
