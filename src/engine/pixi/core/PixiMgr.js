"use strict";
/**
 * @author 雪糕
 * @description
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var singleton_1 = require("../../../design-patterns/creational-patterns/singleton/singleton");
var PixiMgr = /** @class */ (function (_super) {
    __extends(PixiMgr, _super);
    function PixiMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PixiMgr.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PixiMgr.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: false,
        configurable: true
    });
    PixiMgr.prototype.init = function (options) {
        var _a = options !== null && options !== void 0 ? options : {}, _b = _a.width, width = _b === void 0 ? 800 : _b, _c = _a.height, height = _c === void 0 ? 600 : _c, _d = _a.backgroundColor, backgroundColor = _d === void 0 ? 0x1099bb : _d, _e = _a.resolution, resolution = _e === void 0 ? window.devicePixelRatio || 1 : _e;
        this._app = new PIXI.Application({ width: width, height: height, backgroundColor: backgroundColor, resolution: resolution });
        document.body.appendChild(this._app.view);
        this._root = new PIXI.Container();
        this._app.stage.addChild(this._root);
    };
    return PixiMgr;
}(singleton_1.Singleton));
exports.default = PixiMgr.getIns();
