import CalculateCmd from './CalculateCmd';

/** 开平方根 */
export default class SqrtCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);

        this.model.num = Math.sqrt(this.model.num);
    }
}