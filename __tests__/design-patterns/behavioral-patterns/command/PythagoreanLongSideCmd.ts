import { ComplexCommand } from '@/design-patterns/behavioral-patterns/command/ComplexCommand';

import PythagoreanLongSideReceiver from './PythagoreanLongSideReceiver';

/** 勾股定理最长边 */
export default class PythagoreanLongSideCmd extends ComplexCommand {
    protected executeReceiver: PythagoreanLongSideReceiver;
    protected preNumber: number;
    protected numbers: number[];

    public constructor(C: new () => PythagoreanLongSideReceiver, ...numbers: number[]) {
        super(C);
        this.numbers = numbers;
    }
    public execute(isRedo: boolean): void {
        this.preNumber = this.executeReceiver.model.num;
        this.executeReceiver.action(...this.numbers);
    }

    public unExecute(): void {
        this.executeReceiver.model.num = this.preNumber;
    }
}