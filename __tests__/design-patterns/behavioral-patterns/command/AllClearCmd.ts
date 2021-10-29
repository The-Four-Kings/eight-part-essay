import CalculateCmd from './CalculateCmd';

/** 清除 */
export default class AllClearCmd extends CalculateCmd {
    protected onExecute(isRedo: boolean): void {
        super.onExecute(isRedo);
        this.model.num = 0;
    }
}