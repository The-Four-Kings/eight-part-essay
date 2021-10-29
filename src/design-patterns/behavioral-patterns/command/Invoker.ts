import { createCmdQueue } from './utils';

/**
 * 命令管理者
 */
export class Invoker {
    private _pendingCmdQueue: ICommand[];  //预处理命令队列
    private _executedCmdDeque: ICommand[];   //已执行命令双端队列
    private _undoCmdStack: ICommand[];   //撤销命令栈
    private _maxCmdSize: number;    //记录命令最大数 小于等于0为无限

    public constructor(maxCmdSize: number = 0) {
        this._maxCmdSize = maxCmdSize;
        this._pendingCmdQueue = [];
        this._executedCmdDeque = [];
        this._undoCmdStack = [];
    }

    /** 添加预处理命令 */
    public addPendingCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        if (!cmdCtorQueue || cmdCtorQueue.length <= 0) return;

        const cmdQueue = createCmdQueue(...cmdCtorQueue);
        this._pendingCmdQueue = [...this._pendingCmdQueue, ...cmdQueue];
    }

    /** 执行预处理命令队列 */
    public executePendingCmdQueue(): void {
        if (!this._pendingCmdQueue || this._pendingCmdQueue.length <= 0) return;

        this._pendingCmdQueue.forEach(cmd => this.executeCmdInstance(cmd));
        this._pendingCmdQueue.length = 0;
    }

    /** 执行命令 */
    public executeCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        if (!cmdCtorQueue || cmdCtorQueue.length <= 0) return;

        createCmdQueue(...cmdCtorQueue).forEach(cmd => this.executeCmdInstance(cmd));
    }

    /** 执行指定命令实例 */
    private executeCmdInstance(cmd: ICommand): void {
        this._executedCmdDeque.push(cmd);
        if (this._maxCmdSize > 0 && this._executedCmdDeque.length > this._maxCmdSize) {
            const element = this._executedCmdDeque.shift();
            element.destroy();
        }

        this._undoCmdStack.length = 0;  //执行新命令，清空撤销栈

        cmd.execute(false);
    }

    /** 撤销命令 */
    public undoCmd(): void {
        if (!this.checkCanUndo()) return;

        const cmd = this._executedCmdDeque.pop();
        this._undoCmdStack.push(cmd);
        cmd?.unExecute();
    }

    /** 重做命令 */
    public redoCmd(): void {
        if (!this.checkCanRedo()) return;

        const cmd = this._undoCmdStack.pop();
        this._executedCmdDeque.push(cmd);
        cmd.execute(true);
    }

    /** 检查是否可以重做 */
    public checkCanRedo(): boolean {
        return this._undoCmdStack?.length > 0;
    }

    /** 检查是否可以撤销 */
    public checkCanUndo(): boolean {
        return this._executedCmdDeque?.length > 0;
    }
}