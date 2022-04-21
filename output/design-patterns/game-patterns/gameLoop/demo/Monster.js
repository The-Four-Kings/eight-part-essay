"use strict";
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
var GraphicsNode_1 = require("./GraphicsNode");
/**
 * @author 雪糕
 * @description
 */
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ySpeed = 0;
        _this._fallAccSpeed = 0.001;
        _this._fallDefaultSpeed = 0.1;
        _this._jumpAccSpeed = 0.0003;
        _this._jumpDefaultSpeed = -0.5;
        _this._xDefaultSpeed = 0.1;
        _this._xAccSpeed = 0.002;
        _this._dir = 1;
        return _this;
    }
    Monster.prototype.setDir = function (value) {
        this._dir = value;
    };
    Monster.prototype.getXSpeed = function (deltaTime) {
        var speed = this._xDefaultSpeed + this._xAccSpeed * deltaTime;
        return this._dir >= 0 ? speed : -speed;
    };
    Monster.prototype.getYSpeed = function (deltaTime) {
        if (this._ySpeed >= 0 && this.y >= Monster.MAX_Y)
            return this._jumpDefaultSpeed;
        if (this._ySpeed <= 0 && this.y <= Monster.MIN_Y)
            return this._fallDefaultSpeed;
        var accSpeed = this._ySpeed > 0 ? this._fallAccSpeed : this._jumpAccSpeed;
        this._ySpeed += accSpeed * deltaTime;
        return this._ySpeed;
    };
    Monster.prototype.onUpdate = function (deltaTime) {
        this._ySpeed = this.getYSpeed(deltaTime);
        this.y += deltaTime * this._ySpeed;
        this.x += deltaTime * this.getXSpeed(deltaTime);
    };
    Monster.MIN_Y = 50;
    Monster.MAX_Y = 300;
    return Monster;
}(GraphicsNode_1.default));
exports.default = Monster;
