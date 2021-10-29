import { MultipleCommand } from '@/design-patterns/behavioral-patterns/command/MultipleCommand';

import AssignCmd from './AssignCmd';
import MultiplyCmd from './MultiplyCmd';
import PowCmd from './PowCmd';

/** 圆的面积 */
export default class CircleAreaCmd extends MultipleCommand {
    public constructor(r: number) {
        super(
            [AssignCmd, r],
            [MultiplyCmd, 2],
            [PowCmd, 2]
        );
    }
}