import logger from '@/utils/logger';
import { question } from '@/utils/readline';

import Player from './Player';

/**
 * @author 雪糕
 * @description demo
 */
const player = new Player();
const playerStateCfg = new Map([
    [1, player.attack],
    [2, player.defense],
    [3, player.idle],
    [4, player.jump],
    [5, player.run],
    [6, player.walk],
]);
const content = `
        输入对应数字操控角色：
            1：攻击
            2：防御
            3：待机
            4：跳跃
            5：跑动
            6：行走
    `;

const input = async () => {
    const result = await question(content);
    const num = +result;
    if (!num || isNaN(num)) {
        logger.error('输入数字格式错误，请重新输入');
        await input();
        return;
    }

    const fn = playerStateCfg.get(num);
    if (!fn) {
        logger.error('未找到对应数字动作，请重新输入');
        await input();
        return;
    }

    fn.call(player);
    await input();
};

input();