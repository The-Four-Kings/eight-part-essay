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
var imageCfg_1 = require("../../../../config/imageCfg");
var GraphicsNode_1 = require("./GraphicsNode");
var Monster_1 = require("./Monster");
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.stageWidth = 500;
        _this.stageHeight = 500;
        _this.setStage(_this);
        var canvas = document.getElementById('game');
        _this._ctx = canvas.getContext('2d');
        canvas.width = _this.stageWidth;
        canvas.height = _this.stageHeight;
        _this.createChildren();
        _this.addEvent();
        return _this;
    }
    Object.defineProperty(Stage.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: false,
        configurable: true
    });
    Stage.prototype.setDirty = function (value) {
        if (!value)
            return;
        this._dirty = value;
    };
    Stage.prototype.createChildren = function () {
        var background = new GraphicsNode_1.default(imageCfg_1.img_background);
        background.source = imageCfg_1.img_background;
        this.addChild(background);
        var ground = new GraphicsNode_1.default(imageCfg_1.img_ground);
        ground.y = 350;
        ground.width = 500;
        this.addChild(ground);
        this._monster = new Monster_1.default(imageCfg_1.img_purpleMonster);
        this.addChild(this._monster);
        this.createStar();
    };
    Stage.prototype.createStar = function () {
        this._star = new GraphicsNode_1.default(imageCfg_1.img_star);
        this.addChild(this._star);
        this._star.x = 50 + Math.random() * (this.stageWidth - 100);
        this._star.y = 50 + Math.random() * (this.stageHeight - 250);
    };
    Stage.prototype.destroyStar = function () {
        if (!this._star)
            return;
        this.removeChild(this._star);
        this._star = null;
    };
    Stage.prototype.addEvent = function () {
        var _this = this;
        var halfStageWidth = this.stageWidth / 2;
        document.addEventListener("mousedown", function (evt) {
            var dir = evt.clientX > halfStageWidth ? 1 : -1;
            _this._monster.setDir(dir);
        });
    };
    Stage.prototype.$update = function (deltaTime) {
        var _this = this;
        if (this._dirty) {
            this.setDirty(false);
            this._ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
            this.render();
        }
        _super.prototype.$update.call(this, deltaTime);
        if (this.checkHitStar()) {
            this.destroyStar();
            setTimeout(function () {
                _this.createStar();
            }, 1000);
        }
    };
    Stage.prototype.checkHitStar = function () {
        if (!this._monster || !this._star)
            return false;
        if (!this._monster.width || !this._monster.height)
            return false;
        if (!this._star.width || !this._star.height)
            return false;
        if (Math.abs(this._monster.world.x - this._star.world.x) < this._monster.width / 2 + this._star.width / 2
            && Math.abs(this._monster.world.y - this._star.world.y) < this._monster.height / 2 + this._star.height / 2) {
            return true;
        }
        return false;
    };
    return Stage;
}(GraphicsNode_1.default));
exports.default = Stage;
