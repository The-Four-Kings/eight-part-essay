import BaseState from './BaseState';
import BaseStateCtrl from './BaseStateCtrl';

export interface IStateConstructor<T extends BaseState> {
    new(statusCtrl: BaseStateCtrl, name: string): T;

    /** ηΆζε */
    readonly stateName: string;
}