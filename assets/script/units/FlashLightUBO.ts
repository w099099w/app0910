export default class FlashLightUBO {
    /**
     * 中心点颜色
     */
    lightColor: cc.Color = cc.color(130,99,68);

    /**
     * 中心点坐标 ([0.0, 1.0], [0.0, 1.0])
     */
    lightCenterPoint: cc.Vec2 = cc.v2(0.5, 0.5);

    /**
     * 光束角度 [0.0, 180.0]
     */
    lightAngle: number = 45;

    /**
     * 光束宽度 [0.0, +∞]
     */
    lightWidth: number = 0.1;

    /**
     * 是否启用光束渐变
     */
    enableGradient: boolean = true;

    /**
     * 是否裁剪掉透明区域上的点光
     */
    cropAlpha: boolean = true;

    /**
     * 是否开启战争迷雾效果
     */
    enableFog: boolean = false;
}
