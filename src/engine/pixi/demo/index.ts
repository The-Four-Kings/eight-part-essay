import * as PIXI from 'pixi.js';

import { img_bunny } from '../../../config/imageCfg';
import PixiMgr from '../core/PixiMgr';

PixiMgr.init();
const { root, app } = PixiMgr;

// Create a new texture
const texture = PIXI.Texture.from(img_bunny);

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    root.addChild(bunny);
}

// Move container to the center
root.x = app.screen.width / 2;
root.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
root.pivot.x = root.width / 2;
root.pivot.y = root.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    root.rotation -= 0.01 * delta;
});
