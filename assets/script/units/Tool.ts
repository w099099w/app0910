export default class Tool{
    protected  static m_instance: Tool;
    private nonDuplicateID:number;
    private ImageExt:string[];
    private constructor(){
        this.ImageExt = [
            '.png',
            '.jpg',
            '.Png',
            '.Jpj',
            '.PNG',
            '.JPG',
            '.PNg',
            '.JPg',
            'jpeg',
        ];
        this.nonDuplicateID = Date.now();
    }
    public static getInstance():Tool{
        if(!Tool.m_instance){
            Tool.m_instance = new Tool();
            return Tool.m_instance;
        }
        return Tool.m_instance;
    }
    public isIdCardNumber(str:string):boolean{
        let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return reg.test(str);
    }
    public isNickName(str:string):boolean{
        let reg = /^[A-Za-z0-9-\u4e00-\u9fa5\_]*$/g;
        return reg.test(str);
    }
    public isPhoneNumber(tel):boolean{
        let reg =/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    }
    /**
     * @description 生成不重复的ID
     */
    public genNonDuplicateID():number{
        this.nonDuplicateID -= 1;
        return this.nonDuplicateID;
    }
    
    /**
     * @description 加载远程图片(需带后缀名)
     * @param Node 显示的节点(需带后缀名)
     * @param Url 远程地址
     * @param Nodesize 要显示的节点的大小
     */
    public LoadImageRemote(Node:cc.Node,Url:string,Nodesize:cc.Vec2 = null){
        if(!Url || !this.ImageExt.includes(Url.substr(Url.length-4))){
            return
        }
        cc.assetManager.loadRemote(Url, function (err, texture:cc.Texture2D) {
            if(!err && cc.isValid(Node,true)){
                 Node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                 if(Nodesize){
                     Node.width = Nodesize.x;
                     Node.height = Nodesize.y;
                 }
            }
        });
    }
    /**
     * @description 获取当前时间字符串
     */
    public getCurentTime(Time:number = null)
    {
      if(!CC_DEBUG){
        return "0000-00-00 00:00:00";
      }
      function add0(m){return m<10?'0'+m:m };
      let time:Date = null;
      if(Time){
        time = new Date(Time);
      }else{
        time = new Date();
      }
      let y = time.getFullYear();
      let m = time.getMonth()+1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
}
