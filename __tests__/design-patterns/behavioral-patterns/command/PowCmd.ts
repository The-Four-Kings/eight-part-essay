import CalculateCmd from './CalculateCmd';

/** 乘方  */
export default class PowCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this.numbers.reduce((previousValue: number, currentValue: number) => {
            return Math.pow(previousValue, currentValue);
        }, this.model.num);
    }
}