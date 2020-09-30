/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/6
 * @doc 列表Item组件.
 * 说明：
 *      1、此组件须配合List组件使用。（配套的配套的..）
 * @end
 ******************************************/
const { ccclass, property, disallowMultiple, menu, executionOrder } = cc._decorator;

import List from './List';

enum SelectedType {
    NONE = 0,
    TOGGLE = 1,
    SWITCH = 2,
}

@ccclass
@disallowMultiple()
@menu('自定义组件/List Item')
@executionOrder(-5001)          //先于List
export default class ListItem extends cc.Component {
    //图标
    @property({ type: cc.Sprite, tooltip: CC_DEV && '图标' })
    icon: cc.Sprite = null;
    //标题
    @property({ type: cc.Node, tooltip: CC_DEV && '标题' })
    title: cc.Node = null;
    //选择模式
    @property({
        type: cc.Enum(SelectedType),
        tooltip: CC_DEV && '选择模式'
    })
    selectedMode: SelectedType = SelectedType.NONE;
    //被选标志
    @property({
        type: cc.Node, tooltip: CC_DEV && '被选标志',
        visible() { return this.selectedMode > SelectedType.NONE }
    })
    selectedFlag: cc.Node = null;
    //被选择的SpriteFrame
    @property({
        type: cc.SpriteFrame, tooltip: CC_DEV && '被选择的SpriteFrame',
        visible() { return this.selectedMode == SelectedType.SWITCH }
    })
    selectedSpriteFrame: cc.SpriteFrame = null;
    //未被选择的SpriteFrame
    _unselectedSpriteFrame: cc.SpriteFrame = null;
    //自适应尺寸
    @property({
        tooltip: CC_DEV && '自适应尺寸（宽或高）',
    })
    adaptiveSize: boolean = false;
    //选择
    _selected: boolean = false;
    set selected(val: boolean) {
        this._selected = val;
        if (!this.selectedFlag)
            return;
        switch (this.selectedMode) {
            case SelectedType.TOGGLE:
                this.selectedFlag.active = val;
                break;
            case SelectedType.SWITCH:
                let sp: cc.Sprite = this.selectedFlag.getComponent(cc.Sprite);
                if (sp)
                    sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                break;
        }
    }
    get selected() {
        return this._selected;
    }
    //按钮组件
    private _btnCom: any;
    get btnCom() {
        if (!this._btnCom){
            switch(this.node.name){
                case 'sangongrecorditem':{
                    this._btnCom = cc.find('button_detail',this.node).getComponent(cc.Button);
                }break;
                case 'sgdetail':{
                    this._btnCom = cc.find('briefly/button_open',this.node).getComponent(cc.Button);
                }break;
                default:this._btnCom = this.node.getComponent(cc.Button);
            }
        }  
        return this._btnCom;
    }



    //Room按钮组件
    private _btnUpCom: any;
    get btnUpCom() {
        if (!this._btnUpCom){
            this._btnUpCom = this.node.getChildByName('up').getComponent(cc.Button);
        }  
        return this._btnUpCom;
    }
    //按钮组件
    private _btnDownCom: any;
    get btnDownCom() {
        if (!this._btnDownCom){
            this._btnDownCom = this.node.getChildByName('down').getComponent(cc.Button);
        }  
        return this._btnDownCom;
    }
    //按钮组件
    private _btmCom_UpTableRule: any;
    get btmCom_UpTableRule() {
        if (!this._btmCom_UpTableRule){
            this._btmCom_UpTableRule = cc.find('up/detail',this.node).getComponent(cc.Button);
        }  
        return this._btmCom_UpTableRule;
    }
    //按钮组件
    private _btmCom_DownTableRule: any;
    get btmCom_DownTableRule() {
        if (!this._btmCom_DownTableRule){
            this._btmCom_DownTableRule = cc.find('down/detail',this.node).getComponent(cc.Button);
        }  
        return this._btmCom_DownTableRule;
    }



    //依赖的List组件
    public list: List;
    //是否已经注册过事件
    private _eventReg = false;
    //序列id
    public listId: number;

    onLoad() {
        // //没有按钮组件的话，selectedFlag无效
        // if (!this.btnCom)
        //     this.selectedMode == SelectedType.NONE;
        //有选择模式时，保存相应的东西
        if (this.selectedMode == SelectedType.SWITCH) {
            let com: cc.Sprite = this.selectedFlag.getComponent(cc.Sprite);
            this._unselectedSpriteFrame = com.spriteFrame;
        }
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
    }

    _registerEvent() {
        if(this.node.name === 'table'){
            console.log('add')
            if (!this._eventReg) {
                if (this.btnUpCom && this.list.selectedMode > 0) {
                    this.btnUpCom.clickEvents.unshift(this.createEvt(this, 'onClickUp'));
                }
                if (this.btnDownCom && this.list.selectedMode > 0) {
                    this.btnDownCom.clickEvents.unshift(this.createEvt(this, 'onClickDown'));
                }
                if (this.btmCom_DownTableRule && this.list.selectedMode > 0) {
                    this.btmCom_DownTableRule.clickEvents.unshift(this.createEvt(this, 'onClickDownRule'));
                }
                if (this.btmCom_UpTableRule && this.list.selectedMode > 0) {
                    this.btmCom_UpTableRule.clickEvents.unshift(this.createEvt(this, 'onClickUpRule'));
                }
                if (this.adaptiveSize) {
                    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
                }
                this._eventReg = true;
            } 
        }else{
            if (!this._eventReg) {
                if (this.btnCom && this.list.selectedMode > 0) {
                    this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
                }
                if (this.adaptiveSize) {
                    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
                }
                this._eventReg = true;
            } 
        }
    }

    _onSizeChange() {
        this.list._onItemAdaptive(this.node);
    }
    /**
     * 创建事件
     * @param {cc.Component} component 组件脚本
     * @param {string} handlerName 触发函数名称
     * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
     * @returns cc.Component.EventHandler
     */
    createEvt(component: cc.Component, handlerName: string, node: cc.Node = null) {
        if (!component.isValid)
            return;//有些异步加载的，节点以及销毁了。
        component['comName'] = component['comName'] || component.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, '');
        let evt = new cc.Component.EventHandler();
        evt.target = node || component.node;
        evt.component = component['comName'];
        evt.handler = handlerName;
        return evt;
    }

    showAni(aniType: number, callFunc: Function, del: boolean) {
        let acts: any[];
        switch (aniType) {
            case 0: //向上消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * 2),
                ];
                break;
            case 1: //向右消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * 2, 0),
                ];
                break;
            case 2: //向下消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * -2),
                ];
                break;
            case 3: //向左消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * -2, 0),
                ];
                break;
            default: //默认：缩小消失
                acts = [
                    cc.scaleTo(.3, .1),
                ];
                break;
        }
        if (callFunc || del) {
            acts.push(cc.callFunc(() => {
                if (del) {
                    this.list._delSingleItem(this.node);
                    for (let n: number = this.list.displayData.length - 1; n >= 0; n--) {
                        if (this.list.displayData[n].id == this.listId) {
                            this.list.displayData.splice(n, 1);
                            break;
                        }
                    }
                }
                callFunc();
            }));
        }
        this.node.runAction(cc.sequence(acts));
    }

    onClickThis() {
        this.list.selectedId = this.listId;
    }
    //room特殊
    onClickUp() {
        console.log('11111')
        this.list.addRommRuleID = {id:this.listId,pos:ROOM_CLICK_POS.UPTABLE};
    }
    onClickDown() {
        console.log('222222')
        this.list.addRommRuleID = {id:this.listId,pos:ROOM_CLICK_POS.DOWNTABLE};
    }
    onClickUpRule() {
        console.log('33333')
        this.list.addRommRuleID = {id:this.listId,pos:ROOM_CLICK_POS.UPRULE};
    }
    onClickDownRule() {
        console.log('44444')
        this.list.addRommRuleID = {id:this.listId,pos:ROOM_CLICK_POS.DOWNRULE};
    }

}
