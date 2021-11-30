/**
 * @author 雪糕
 * @description 全局数据
 */
class Global {
    public ctx: CanvasRenderingContext2D;
    public dirty: boolean;
}

const global = new Global();
export default global;