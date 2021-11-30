import { img_bunny } from '../../../../config/imageCfg';
import global from './global';
import GraphicsNode from './GraphicsNode';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = global.ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const parentNode = new GraphicsNode();
const child = new GraphicsNode();
parentNode.addChild(child);

const movePixel = 10;
window.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.code) {
        case "KeyW":
            parentNode.y -= movePixel;
            child.setSrc(img_bunny);
            break;
        case "KeyS":
            parentNode.y += movePixel;
            break;
        case "KeyA":
            parentNode.x -= movePixel;
            break;
        case "KeyD":
            parentNode.x += movePixel;
            break;
        default:
            break;
    }
});

requestAnimationFrame(onTick);
function onTick(): void {
    requestAnimationFrame(onTick);
    update();
}

function update(): void {
    if (global.dirty) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        parentNode.render();
        global.dirty = false;
    }
}
