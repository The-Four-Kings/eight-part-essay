import { Receiver } from '@/design-patterns/behavioral-patterns/command/Receiver';

import CalculateModel from './CalculateModel';

/** 勾股定理最长边执行者 */
export default class PythagoreanLongSideReceiver extends Receiver {
    public get model(): typeof CalculateModel {
        return CalculateModel;
    }

    public action(...numbers: number[]): void {
        if (!numbers || numbers.length <= 0) return;

        this.model.num = Math.sqrt(numbers.reduce((previousValue: number, currentValue: number) => previousValue + Math.pow(currentValue, 2), 0));
    }

}