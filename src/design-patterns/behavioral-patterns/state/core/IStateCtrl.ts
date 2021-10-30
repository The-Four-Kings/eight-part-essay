import BaseState from './BaseState';
import { IStateConstructor } from './types';

/**
 * @author 雪糕
 * @description
 */
export interface IStateCtrl {
    /**当前状态 */
    curState: BaseState;

    /**
     * 进入制定状态
     * @param state 某个状态
     * @param params 参数
     */
    enter<T extends BaseState>(C: IStateConstructor<T>, ...params: unknown[]): boolean;

    /**
     * tick执行当前状态
     * @param params 参数
     */
    update(...params: unknown[]): void;

    /** 离开当前状态 离开后就没有任何状态了 */
    exit(): void;
}