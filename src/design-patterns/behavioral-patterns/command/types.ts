/**
 * @interface 命令接口定义
 */
interface ICommand {
    execute(isRedo: boolean): void;
    unExecute?(): void;
    destroy?(): void;
}

type TCommandConstructor = [new (...param: unknown[]) => ICommand, ...unknown[]] | (new (...param: unknown[]) => ICommand);