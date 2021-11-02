import BaseState from './BaseState';
import BaseStateCtrl from './BaseStateCtrl';

export interface IStateConstructor<T extends BaseState> {
    new(statusCtrl: BaseStateCtrl, name: string): T;

    /** 状态名 */
    readonly stateName: string;
}