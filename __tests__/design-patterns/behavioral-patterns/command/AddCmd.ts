import CalculateCmd from './CalculateCmd';

/** 加法 */
export default class AddCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = this.numbers.reduce((previousValue: number, currentValue: number) => {
            return previousValue + currentValue;
        }, this.model.num);
    }
}