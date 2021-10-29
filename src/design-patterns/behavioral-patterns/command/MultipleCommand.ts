import { Command } from './Command';
import { createCmdQueue } from './utils';

/** 
 * @Description 复合型命令 里面有多条命令 可以用在多选什么批量命令上
 */
export class MultipleCommand extends Command {

    protected cmdQueue: ICommand[];

    public constructor(...cmdCtorQueue: TCommandConstructor[]) {
        super();
        this.cmdQueue = createCmdQueue(...cmdCtorQueue);
    }

    protected onExecute(isRedo: boolean): void {
        if (!this.cmdQueue || this.cmdQueue.length <= 0) return;

        this.cmdQueue.forEach(cmd => cmd.execute(isRedo));
    }

    protected onUnExecute(): void {
        if (!this.cmdQueue || this.cmdQueue.length <= 0) return;

        //反向撤销
        this.cmdQueue.reverse().forEach(cmd => cmd.unExecute());
    }

    /**初始添加子命令 一旦开始执行或者撤销就不允许再添加命令 否则会错乱*/
    public addCmd(...cmdCtorQueue: TCommandConstructor[]): void {
        const cmdQueue = createCmdQueue(...cmdCtorQueue);
        this.cmdQueue = { ...this.cmdQueue, ...cmdQueue };
    }
}