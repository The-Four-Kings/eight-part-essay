import BaseState from './BaseState';
import { IStateCtrl } from './IStateCtrl';
import { IStateConstructor } from './types';

/**
 * @author 雪糕
 * @description 状态控制基类
 */
export default class BaseStateCtrl implements IStateCtrl {
    public get curState(): BaseState {
        return this._curState;
    }

    private _curState: BaseState;

    public enter<T extends BaseState>(C: IStateConstructor<T>, ...params: unknown[]): boolean {
        if (!C) return false;
        if (this._curState && this._curState instanceof C) return false;

        this.exit();

        const nextState = new C(this, C.stateName);
        this.onEnter(nextState);
        this._curState = nextState;
        this._curState.$enter(this, ...params);

        return true;
    }

    protected onEnter(state: BaseState): void {
        //
    }

    public update(...params: unknown[]): void {
        if (!this._curState) return;

        this._curState.$update(...params);
    }

    public exit(...params: unknown[]): void {
        if (!this._curState) return;

        const tempState = this._curState;
        this._curState = null;
        tempState.$exit(...params);
        this.onExit(tempState);
    }

    protected onExit(state: BaseState): void {
        //
    }
}