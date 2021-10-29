/**
 * @abstract 命令执行者抽象类
 */
export abstract class Receiver {
    public abstract action(...param: unknown[]): void;
}