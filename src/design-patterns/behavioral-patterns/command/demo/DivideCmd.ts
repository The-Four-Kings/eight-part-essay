import CalculateCmd from './CalculateCmd';

/** 除法 */
export default class DivideCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this.numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue / currentValue;
        }, this.model.num);
    }
}