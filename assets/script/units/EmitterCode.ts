export default class EmitterCode{
    /**
     * @description HOME粒子渲染事件
     */
    public static MODE_HOMESTARTPARTICLE:number = 0;

    /**
     * @description HOME单击大联盟后刷新视图
     */
    public static MODE_HOMECLICKDLM:number = 1;
    /**
     * @description HOME单击俱乐部后刷新视图
     */
    public static MODE_HOMECLICKJLB:number = 2;

    /**
     * @description HOME单击创建房间后刷新视图
     */
    public static MODE_HOMECLICKCTM:number = 3;


    /**
     * @description LEFT单击创建房间后刷新视图
     */
    public static MODE_LEFTCLICKJOINROOM:number = 4;
    /**
     * @description LEFT单击创建房间后刷新视图
     */
    public static MODE_LEFTCLICKOPENDROOM:number = 5;


    /**
     * @description NAV单击分享后刷新视图
     */
    public static MODE_NAVCLICKSHARE:number = 6;
    /**
     * @description NAV单击玩法后刷新视图
     */
    public static MODE_NAVCLICKPLAY:number = 7;
      /**
     * @description NAV单击战绩后刷新视图
     */
    public static MODE_NAVCLICKRECORD:number = 8;
    /**
     * @description NAV单击菜单后刷新视图
     */
    public static MODE_NAVCLICKMENU:number = 9;


     /**
     * @description CONTROLLER单击大联盟通知控制器
     */
    public static CTRL_HOMEDLMCLICK:number = 1000;
    /**
     * @description CONTROLLER单击俱乐部通知控制器
     */
    public static CTRL_HOMEJLBCLICK:number = 1001;
    /**
     * @description CONTROLLER单击创建房间通知控制器
     */
    public static CTRL_HOMECTMCLICK:number = 1002;
    
    
    /**
     * @description LEFT单击创建房间通知控制器
     */
    public static CTRL_LEFTCLICKJOINROOM:number = 1003;
    /**
     * @description LEFT单击已开房间通知控制器
     */
    public static CTRL_LEFTCLICKOPENDROOM:number = 1004;
    

     /**
     * @description NAV单击分享后刷新视图
     */
    public static CTRL_NAVCLICKSHARE:number = 1005;
    /**
     * @description NAV单击玩法后刷新视图
     */
    public static CTRL_NAVCLICKPLAY:number = 1006;
      /**
     * @description NAV单击战绩后刷新视图
     */
    public static CTRL_NAVCLICKRECORD:number = 1007;
    /**
     * @description NAV单击菜单后刷新视图
     */
    public static CTRL_NAVCLICKMENU:number = 1008;
}
