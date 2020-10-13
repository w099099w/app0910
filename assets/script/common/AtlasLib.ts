export default class AtlasLib{
    private cache:AtlasMap[];
    private static m_instance:AtlasLib;
    private constructor(){
        this.cache = [];
    }
    public static getInstance():AtlasLib{
        if(!AtlasLib.m_instance){
            AtlasLib.m_instance = new AtlasLib();
            return AtlasLib.m_instance;
        }
        return AtlasLib.m_instance;
    }
    public cleanAtlas(name:string){
        if(this.cache){
            //注意调用时机确定没有使用时才
            if(this.cache[name]){
                cc.resources.release(this.cache[name].path);//释放指定缓存
                delete this.cache[name];
            }else{
                for(let key in this.cache){
                    cc.resources.release(this.cache[key].path);//释放全部缓存
                }
                this.cache = [];
            }
        }
    }
    public loadAtlas(name:string,path:string,callback:Function = null){
        if(!name || !path ||typeof name !== 'string' || typeof path !== 'string'){
            return;
        }else if(this.cache && this.cache[name] && this.cache[name].path == path){
            if(callback){
                callback(null, this.cache[name].atlas);
            }
            return;//重复加载一个图集return;
        }
        if(!this.cache){
            this.cache = [];//定义缓存对象
        }
        cc.resources.load(path, cc.SpriteAtlas, function (err, atlas) {
            if(!err){
                let data = {
                    path:path,
                    atlas:atlas,
                }
                this.cache[name] = data;
            }
            if(callback){
                callback(err, atlas);
            }
        }.bind(this));
    }
    public getSpriteFrame(name:string,spName:string){
        if(!this.cache[name]){
            return null;
        }
        let spriteFrame = this.cache[name].atlas.getSpriteFrame(spName);
        if(!(spriteFrame instanceof cc.SpriteFrame)){
            return null;
        }
        return spriteFrame;
    }
}
