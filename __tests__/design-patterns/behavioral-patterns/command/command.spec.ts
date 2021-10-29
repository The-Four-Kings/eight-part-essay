
import { Invoker } from '@/design-patterns/behavioral-patterns/command/Invoker';

import AddCmd from './AddCmd';
import AllClearCmd from './AllClearCmd';
import AssignCmd from './AssignCmd';
import CalculateModel from './CalculateModel';
import CircleAreaCmd from './CircleAreaCmd';
import DivideCmd from './DivideCmd';
import MultiplyCmd from './MultiplyCmd';
import PythagoreanLongSideCmd from './PythagoreanLongSideCmd';
import PythagoreanLongSideReceiver from './PythagoreanLongSideReceiver';
import SqrtCmd from './SqrtCmd';
import SubtractCmd from './SubtractCmd';

describe('command UNIT', () => {
    const invoker = new Invoker();
    const model = CalculateModel;
    const originalNum = model.num = 0;
    const calNum = 2;

    test('add command', () => {
        const result = originalNum + calNum;

        invoker.executeCmd(AllClearCmd, [AddCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('subtract command', () => {
        const result = originalNum - calNum;

        invoker.executeCmd(AllClearCmd, [SubtractCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);

        invoker.redoCmd();
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('multiply command', () => {
        const assignNum = 10;
        const result = assignNum * calNum;

        invoker.addPendingCmd([AssignCmd, assignNum], [MultiplyCmd, calNum]);
        invoker.executePendingCmdQueue();

        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('divide command', () => {
        const assignNum = 10;
        const result = assignNum / calNum;

        invoker.executeCmd([AssignCmd, assignNum], [DivideCmd, calNum]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('sqrt command', () => {
        const assignNum = 10;
        const result = Math.sqrt(assignNum);

        invoker.executeCmd([AssignCmd, assignNum], SqrtCmd);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(assignNum);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('circle area command', () => {
        const radius = 10;
        const result = Math.pow(2 * radius, 2);

        invoker.executeCmd([CircleAreaCmd, radius]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('pythagorean theorem long side command', () => {
        const sideA = 3;
        const sideB = 4;
        const result = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));

        invoker.executeCmd([PythagoreanLongSideCmd, PythagoreanLongSideReceiver, sideA, sideB]);
        expect(model.num).toBe(result);
        invoker.undoCmd();
        expect(model.num).toBe(originalNum);
    });
});