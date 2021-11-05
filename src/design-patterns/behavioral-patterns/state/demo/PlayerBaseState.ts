import logger from '@/utils/logger';

import BaseState from '../core/BaseState';

/**
 * @author 雪糕
 * @description 玩家状态基类
 */
export default abstract class PlayerBaseState extends BaseState {
    protected onEnter(...params: unknown[]) {
        logger.log(`player enter ${this._stateName} state`);
    }

    protected onUpdate(...params: unknown[]) {
        logger.log(`player update ${this._stateName} state`);
    }

    protected onExit(...params: unknown[]) {
        logger.log(`player exit ${this._stateName} state`);
    }
}