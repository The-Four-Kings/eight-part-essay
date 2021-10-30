import BaseStateCtrl from '../core/BaseStateCtrl';
import Player from './Player';

/**
 * @author 雪糕
 * @description 角色状态控制
 */
export default class PlayerStateCtrl extends BaseStateCtrl {
    private _refPlayer: Player;
    public get refPlayer(): Player {
        return this._refPlayer;
    }
    public setRefPlayer(value: Player) {
        this._refPlayer = value;
    }
}