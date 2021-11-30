"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getter instance 版本
 */
function singleton() {
    var C = /** @class */ (function () {
        // eslint-disable-next-line no-useless-constructor
        function C() {
            // 设置constructor为protected 防止直接通过new创建实例
        }
        Object.defineProperty(C, "ins", {
            /** 获取单例对象 */
            get: function () {
                if (C._ins === null) {
                    C._ins = new this();
                }
                return C._ins;
            },
            enumerable: false,
            configurable: true
        });
        C._ins = null;
        return C;
    }());
    return C;
}
exports.default = singleton;
/**
 * @author 雪糕
 * @description 可继承的范型单例基类 getIns() 版本
 */
var Singleton = /** @class */ (function () {
    function Singleton(flag) {
        if (!flag) {
            throw new Error('Singleton can not direct constructor, please use instance!');
        }
    }
    Singleton.getIns = function () {
        if (!this._instance) {
            this._instance = new this(true);
        }
        return this._instance;
    };
    return Singleton;
}());
exports.Singleton = Singleton;
