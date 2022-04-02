"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 雪糕
 * @description 全局数据
 */
var Global = /** @class */ (function () {
    function Global() {
    }
    Object.defineProperty(Global.prototype, "dirty", {
        get: function () {
            return this._dirty;
        },
        enumerable: false,
        configurable: true
    });
    Global.prototype.setDirty = function (value) {
        this._dirty = value;
    };
    return Global;
}());
var global = new Global();
exports.default = global;
