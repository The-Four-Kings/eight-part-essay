import CalculateCmd from './CalculateCmd';

/** 乘法 */
export default class MultiplyCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this.numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue * currentValue;
        }, this.model.num);
    }
}