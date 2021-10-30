import Command from '../core/Command';
import CalculateModel from './CalculateModel';

/** 
 * @abstract 计算器命令抽象类
 */
export default abstract class CalculateCmd extends Command {
    protected preNumber: number;

    protected numbers: number[];
    public get model(): typeof CalculateModel {
        return CalculateModel;
    }

    public constructor(...numbers: number[]) {
        super();
        this.numbers = numbers;
    }

    protected onExecute(_: boolean): void {
        this.preNumber = this.model.num;
    }

    protected onUnExecute(): void {
        this.model.num = this.preNumber;
    }
}