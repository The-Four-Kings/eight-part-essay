export function createCmdQueue(...cmdCtorQueue: TCommandConstructor[]): ICommand[] {
    return cmdCtorQueue.map(cmdCtor => {
        if (Array.isArray(cmdCtor)) {
            const [C, ...param] = cmdCtor;
            return new C(...param);
        }

        const C = cmdCtor;
        return new C();
    });
}