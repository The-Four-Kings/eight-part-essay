import Receiver from './Receiver';

/**
 * @abstract 复杂命令抽象类（通过Receiver执行逻辑）
 */
export default abstract class ComplexCommand implements ICommand {
    protected executeReceiver: Receiver;
    public constructor(C: new () => Receiver, ..._: unknown[]) {
        this.executeReceiver = new C();
    }

    public abstract execute(isRedo: boolean): void;

    public abstract unExecute(): void;
}