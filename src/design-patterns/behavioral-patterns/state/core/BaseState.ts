import BaseStateCtrl from './BaseStateCtrl';

/**
 * @author 雪糕
 * @description 状态基类
 */
export default abstract class BaseState {
    public static readonly stateName: string;
    protected _stateName: string;
    public get stateName(): string {
        return this._stateName;
    }
    protected _statusCtrl: BaseStateCtrl;

    public constructor(statusCtrl: BaseStateCtrl, stateName: string) {
        this._stateName = stateName;
        this._statusCtrl = statusCtrl;
    }

    public $enter(...params: unknown[]): void {
        this.onEnter(...params);
    }

    protected abstract onEnter(...params: unknown[]);

    public $update(...params: unknown[]): void {
        this.onUpdate(...params);
    }

    protected abstract onUpdate(...params: unknown[]);

    public $exit(...params: unknown[]): void {
        this.onExit(...params);
    }

    protected abstract onExit(...params: unknown[]);

    /**是某个状态类 不考虑父子类关系*/
    public isStatus(C: typeof BaseState): boolean {
        return this._stateName === C.stateName;
    }

    /**是某个类型的状态 考虑父子类关系 */
    public isTypeStatus(C: typeof BaseState): boolean {
        return this instanceof C;
    }
}