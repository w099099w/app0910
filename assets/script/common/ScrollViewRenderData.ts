import MyAnimation from "./MyAnimation";

export default abstract class ScrollViewRenderData extends MyAnimation{
    constructor(){
        super();
    }
    abstract RenderMain(...Argc):void;
    abstract RenderPopup(...Argc):void;
    abstract ClickMain(...Argc):void;
    abstract ClickPopup(...Argc):void;
}