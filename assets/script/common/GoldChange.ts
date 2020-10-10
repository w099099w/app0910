const { ccclass, property, menu, disallowMultiple, executeInEditMode } = cc._decorator;

cc.macro.ENABLE_WEBGL_ANTIALIAS = true;

/** UI 矩形圆角遮罩 */
@ccclass()
@disallowMultiple()   
@executeInEditMode() 
@menu('渲染组件/加减分')
export default class GoldChange extends cc.Component {

    @property(cc.Font)
    _addFount:cc.Font = null;
    @property(cc.Font)
    get addFount():cc.Font{
        return this._addFount;
    }
    set addFount(font:cc.Font){
        this._addFount = font;
        let Component:cc.Label = this.node.getChildByName('addNode').getComponent(cc.Label);
        Component.font = this.addFount;
        Component.lineHeight = Component.fontSize = 32;
        Component.verticalAlign = cc.Label.VerticalAlign.CENTER;
        Component.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
    }

    @property(cc.Font)
    _subFount:cc.Font= null;
    @property(cc.Font)
    get subFount():cc.Font{
        return this._subFount;
    }
    set subFount(font:cc.Font){
        this._subFount = font;
        let Component:cc.Label = this.node.getChildByName('subNode').getComponent(cc.Label);
        Component.font = this.subFount;
        Component.lineHeight = Component.fontSize = 32;
        Component.verticalAlign = cc.Label.VerticalAlign.CENTER;
        Component.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
    }
    
    private addNode:cc.Node;
    private subNode:cc.Node;
    private _string:number;
    get string():number{
        return this._string;
    }
    set string(val:number){
        this.checkNode();
        this.node.active = true;
        if(val >= 0){
            this.addNode.active = true;
            this.addNode.opacity = 255;
            this.subNode.active = false;
            this.addNode.getComponent(cc.Label).string = String('+'+val);
            cc.tween(this.addNode).delay(1.5).to(0.5,{opacity:0},{easing:'quadOut'}).call(()=>{
                this.addNode.active = false;   
            }).start();
        }else{
            this.addNode.active = false;
            this.subNode.opacity = 255;
            this.subNode.active = true;
            this.subNode.getComponent(cc.Label).string = String('-'+val);
            cc.tween(this.subNode).delay(1.5).to(0.5,{opacity:0},{easing:'quadOut'}).call(()=>{
                this.subNode.active = false;   
            }).start();
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }
    private checkNode(){
        if(this.node.children.length !== 2){
            this.node.removeAllChildren();
            this.createAddNode();
            this.createSubNode();
            return;
        }
        let addNode = this.node.getChildByName('addNode');
        if(!addNode){
            this.createAddNode();
        }else{
            if(addNode.getComponent(cc.Label)){
                return;
            }
            addNode.removeComponent(cc.Label);
            let Component = addNode.addComponent(cc.Label);
            Component.font = this.addFount;
        }
        let subNode = this.node.getChildByName('addNode');
        if(!subNode){
            this.createAddNode();
        }else{
            if(subNode.getComponent(cc.Label)){
                return;
            }
            subNode.removeComponent(cc.Label);
            let Component = subNode.addComponent(cc.Label);
            Component.font = this.subFount;
        } 
    }
    private createAddNode(){
        this.addNode = new cc.Node('addNode');
        let Component = this.addNode.addComponent(cc.Label);
        this.node.addChild(this.addNode);
    }
    private createSubNode(){
        this.subNode = new cc.Node('subNode');
        let Component = this.subNode.addComponent(cc.Label);
        this.node.addChild(this.subNode);
    }
    start () {
        this.checkNode();
    }

    // update (dt) {}
}
