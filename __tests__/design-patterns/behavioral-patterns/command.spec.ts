import AddCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/AddCmd';
import AllClearCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/AllClearCmd';
import AssignCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/AssignCmd';
import CalculateModel from '../../../src/design-patterns/behavioral-patterns/command/demo/CalculateModel';
import Calculator from '../../../src/design-patterns/behavioral-patterns/command/demo/Calculator';
import CircleAreaCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/CircleAreaCmd';
import DivideCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/DivideCmd';
import MultiplyCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/MultiplyCmd';
import PythagoreanLongSideCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/PythagoreanLongSideCmd';
import PythagoreanLongSideReceiver from '../../../src/design-patterns/behavioral-patterns/command/demo/PythagoreanLongSideReceiver';
import SqrtCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/SqrtCmd';
import SubtractCmd from '../../../src/design-patterns/behavioral-patterns/command/demo/SubtractCmd';

describe('command calculator', () => {
    const calculator = new Calculator();
    const model = CalculateModel;
    const originalNum = model.num = 0;
    const calNum = 2;

    test('add command', () => {
        const result = originalNum + calNum;

        calculator.executeCmd(AllClearCmd, [AddCmd, calNum]);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('subtract command', () => {
        const result = originalNum - calNum;

        calculator.executeCmd(AllClearCmd, [SubtractCmd, calNum]);
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);

        calculator.redoCmd();
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('multiply command', () => {
        const assignNum = 10;
        const result = assignNum * calNum;

        calculator.addPendingCmd([AssignCmd, assignNum], [MultiplyCmd, calNum]);
        calculator.executePendingCmdQueue();

        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(assignNum);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('divide command', () => {
        const assignNum = 10;
        const result = assignNum / calNum;

        calculator.executeCmd([AssignCmd, assignNum], [DivideCmd, calNum]);
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(assignNum);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('sqrt command', () => {
        const assignNum = 10;
        const result = Math.sqrt(assignNum);

        calculator.executeCmd([AssignCmd, assignNum], SqrtCmd);
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(assignNum);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('circle area command', () => {
        const radius = 10;
        const result = Math.pow(2 * radius, 2);

        calculator.executeCmd([CircleAreaCmd, radius]);
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });

    test('pythagorean theorem long side command', () => {
        const sideA = 3;
        const sideB = 4;
        const result = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));

        calculator.executeCmd([PythagoreanLongSideCmd, PythagoreanLongSideReceiver, sideA, sideB]);
        expect(model.num).toBe(result);
        calculator.undoCmd();
        expect(model.num).toBe(originalNum);
    });
});