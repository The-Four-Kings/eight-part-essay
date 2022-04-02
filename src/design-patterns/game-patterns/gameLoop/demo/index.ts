import Stage from './Stage';

let preTimestamp: number;
const stage = new Stage();
const MS_PER_UPDATE = 1000 / 60;
let remainTime = 0;

//根据浏览器默认帧率
requestAnimationFrame(onTick);
function onTick(timestamp: number): void {
    if (!preTimestamp) {
        preTimestamp = timestamp;
    }

    const deltaTime = timestamp - preTimestamp;
    preTimestamp = timestamp;
    stage.$update(deltaTime);
    requestAnimationFrame(onTick);
}

//自定义帧率
// requestAnimationFrame(onTick);
// function onTick(timestamp: number): void {
//     if (!preTimestamp) {
//         preTimestamp = timestamp;
//     }
//     const deltaTime = timestamp - preTimestamp;
//     preTimestamp = timestamp;
//     remainTime += deltaTime;

//     while (remainTime >= MS_PER_UPDATE) {
//         stage.$update(MS_PER_UPDATE);
//         remainTime -= MS_PER_UPDATE;
//     }
//     requestAnimationFrame(onTick);
// }

//setTimeout 实现自定义帧率
// preTimestamp = Date.now();
// function ticker() {
//     setTimeout(() => {
//         const currentTime = Date.now();
//         const deltaTime = currentTime - preTimestamp;
//         preTimestamp = currentTime;
//         remainTime += deltaTime;
//         while (remainTime >= MS_PER_UPDATE) {
//             stage.$update(MS_PER_UPDATE);
//             remainTime -= MS_PER_UPDATE;
//         }

//         ticker();
//     }, 1);
// }

// ticker();