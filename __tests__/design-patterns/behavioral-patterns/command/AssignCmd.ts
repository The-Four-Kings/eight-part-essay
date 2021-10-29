import CalculateCmd from './CalculateCmd';

/** 赋值 */
export default class AssignCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        if (this.numbers.length > 0) {
            this.model.num = this.numbers[this.numbers.length - 1];
        }
    }
}