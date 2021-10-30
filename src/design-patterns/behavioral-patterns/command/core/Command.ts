/**
 * @abstract 命令抽象类
 */
export default abstract class Command implements ICommand {
    protected executed: boolean;
    public constructor(..._: unknown[]) {
        //
    }

    /** 执行命令-外部调用 */
    public execute(isRedo: boolean): void {
        if (this.executed) return;

        this.executed = true;
        this.onExecute(isRedo);
    }

    /** 当执行命令-内部实现 */
    protected abstract onExecute(isRedo: boolean): void;

    /** 撤销命令-外部调用 */
    public unExecute(): void {
        if (!this.executed) return;

        this.executed = false;
        this.onUnExecute();
    }

    /** 当撤销命令-内部实现 */
    protected abstract onUnExecute(): void;

    /** 销毁 */
    public destroy(): void {
        //
    }
}