import SceneManager from "../common/SceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private p1Pos:cc.Vec2[];
    private p2Pos:cc.Vec2[];
    private tkey:number;
    private tkey2:number;
    @property(cc.Node)
    p1: cc.Node = null;
    @property(cc.Node)
    p2: cc.Node = null;
    onLoad () {
        this.p1Pos = [
            new cc.Vec2(-190,0),
            new cc.Vec2(0,190),
            new cc.Vec2(190,0),
            new cc.Vec2(0,-190),
        ]
        this.p2Pos = [
            new cc.Vec2(190,0),
            new cc.Vec2(0,-190),
            new cc.Vec2(-190,0),
            new cc.Vec2(0,190),
        ]
        SceneManager.getInstance().setScene(cc.director.getScene());
    }
    onback(){
        SceneManager.getInstance().loadScene('passport');
    }
    start () {
        this.tkey = 1;
        this.tkey2 = 1;
        this.p1.position = new cc.Vec3(this.p1Pos[0].x,this.p1Pos[0].y,0);
        this.p2.position = new cc.Vec3(this.p2Pos[0].x,this.p2Pos[0].y,0);
        this.runPartcle();
        this.runPartcle2();
    }
    runPartcle(){
        cc.tween(this.p1).to(2,{x:this.p1Pos[this.tkey].x,y:this.p1Pos[this.tkey].y}).call(()=>{
            this.tkey+=1
            if(this.tkey > this.p1Pos.length-1){
                this.tkey = 0;
            }
            this.runPartcle()
        }).start()
    }
    runPartcle2(){
        cc.tween(this.p2).to(2,{x:this.p2Pos[this.tkey2].x,y:this.p2Pos[this.tkey2].y}).call(()=>{
            this.tkey2+=1
            if(this.tkey2 > this.p2Pos.length-1){
                this.tkey2 = 0;
            }
            this.runPartcle2()
        }).start()
    }
    // update (dt) {}
}
