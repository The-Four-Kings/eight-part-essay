import PlayerAttackState from './PlayerAttackState';
import PlayerDefenseState from './PlayerDefenseState';
import PlayerIdleState from './PlayerIdleState';
import PlayerJumpState from './PlayerJumpState';
import PlayerRunState from './PlayerRunState';
import PlayerStateCtrl from './PlayerStateCtrl';
import PlayerWalkState from './PlayerWalkState';

/**
 * @author 雪糕
 * @description 角色
 */
export default class Player {
    /** 状态控制 */
    private _stateCtrl: PlayerStateCtrl;
    public get stateCtrl(): PlayerStateCtrl {
        return this._stateCtrl;
    }

    public constructor() {
        this._stateCtrl = new PlayerStateCtrl();
        this._stateCtrl.setRefPlayer(this);
        this._stateCtrl.enter(PlayerIdleState);//默认进入待机状态
    }

    /** 攻击 */
    public attack(): void {
        this._stateCtrl.enter(PlayerAttackState);
    }

    /** 防御 */
    public defense(): void {
        this._stateCtrl.enter(PlayerDefenseState);
    }

    /** 防御 */
    public idle(): void {
        this._stateCtrl.enter(PlayerIdleState);
    }

    /** 跳跃 */
    public jump(): void {
        this._stateCtrl.enter(PlayerJumpState);
    }

    /** 跑动 */
    public run(): void {
        this._stateCtrl.enter(PlayerRunState);
    }

    /** 行走 */
    public walk(): void {
        this._stateCtrl.enter(PlayerWalkState);
    }
}