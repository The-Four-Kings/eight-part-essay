/**
 * @author 雪糕
 * @description
 */

import * as PIXI from 'pixi.js';

import { Singleton } from '../../../design-patterns/creational-patterns/singleton/singleton';

class PixiMgr extends Singleton {
    private _root: PIXI.Container;
    public get root(): PIXI.Container {
        return this._root;
    }

    private _app: PIXI.Application;
    public get app(): PIXI.Application {
        return this._app;
    }

    public init(options?: PIXI.IApplicationOptions) {
        const { width = 800, height = 600, backgroundColor = 0x1099bb, resolution = window.devicePixelRatio || 1 } = options ?? {};

        this._app = new PIXI.Application({ width, height, backgroundColor, resolution });
        document.body.appendChild(this._app.view);

        this._root = new PIXI.Container();
        this._app.stage.addChild(this._root);
    }
}

export default PixiMgr.getIns();