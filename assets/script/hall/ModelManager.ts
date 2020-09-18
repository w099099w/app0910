import Home from "./base/Home"
import Left from "./base/Left";
import Navbar from "./base/Navbar";
import ShareView from "./popup/ShareView";
export default class ModelManager{
    private node:cc.Node;
    private cl_Home:Home;
    private cl_Left:Left;
    private cl_Navbar:Navbar;
    private cl_ShareView:ShareView;
    private static m_instance:ModelManager;
    private constructor(Node:cc.Node = null){
        this.node = Node
    }
    public static getInstance(Node:cc.Node = null):ModelManager{
        if(!ModelManager.m_instance){
            ModelManager.m_instance = new ModelManager(Node)
            return ModelManager.m_instance;
        }
        return ModelManager.m_instance;
    }
    public setMainNode(Node:cc.Node){
        this.node = Node;
    }
    /**
     * @description 所有该场景使用的Mode执行new
     */
    public init(){
        this.cl_Home = new Home(this.node);
        this.cl_Left = new Left(this.node);
        this.cl_ShareView = new ShareView(this.node);
        this.cl_Navbar = new Navbar(this.node,this.cl_ShareView);
    }
    /**
     * @description 所有该场景使用的Mode执行start
     */
    public start(){
        this.cl_Home.start();
        this.cl_Left.start();
        this.cl_ShareView.start();
        this.cl_Navbar.start();
    }
}
