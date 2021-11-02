/**
 * @author 雪糕
 * @description 状态模式测试用例
 */

import Player from '@/design-patterns/behavioral-patterns/state/demo/Player';
import PlayerAttackState from '@/design-patterns/behavioral-patterns/state/demo/PlayerAttackState';
import PlayerDefenseState from '@/design-patterns/behavioral-patterns/state/demo/PlayerDefenseState';
import PlayerIdleState from '@/design-patterns/behavioral-patterns/state/demo/PlayerIdleState';
import PlayerJumpState from '@/design-patterns/behavioral-patterns/state/demo/PlayerJumpState';
import PlayerRunState from '@/design-patterns/behavioral-patterns/state/demo/PlayerRunState';
import PlayerWalkState from '@/design-patterns/behavioral-patterns/state/demo/PlayerWalkState';

describe('state player', () => {
    const player = new Player();

    test('attack state', () => {
        player.attack();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerAttackState.stateName);
    });

    test('defense state', () => {
        player.defense();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerDefenseState.stateName);
    });

    test('idle state', () => {
        player.idle();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerIdleState.stateName);
    });

    test('jump state', () => {
        player.jump();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerJumpState.stateName);
    });

    test('run state', () => {
        player.run();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerRunState.stateName);
    });

    test('walk state', () => {
        player.walk();
        expect(player.stateCtrl.curState.stateName).toBe(PlayerWalkState.stateName);
    });

    test('exit state', () => {
        player.stateCtrl.exit();
        expect(player.stateCtrl.curState).toBe(null);
    });
});