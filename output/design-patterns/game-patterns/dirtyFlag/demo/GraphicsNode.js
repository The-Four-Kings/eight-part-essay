"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = require("./global");
/**
 * @author 雪糕
 * @description
 */
var GraphicsNode = /** @class */ (function () {
    function GraphicsNode() {
        this._local = { x: 0, y: 0 };
        this._world = { x: 0, y: 0 };
        this.children = [];
        this._src = "";
        this.setDirty(true);
    }
    GraphicsNode.prototype.setDirty = function (value) {
        this._dirty = value;
        if (value) {
            global_1.default.dirty = true;
        }
    };
    GraphicsNode.prototype.setSrc = function (value) {
        if (this._src === value)
            return;
        this._src = value;
        this.setDirty(true);
    };
    GraphicsNode.prototype.setImageSrc = function (value) {
        this._imageSrc = value;
        this._image.src = this._src;
    };
    Object.defineProperty(GraphicsNode.prototype, "x", {
        get: function () {
            return this._local.x;
        },
        set: function (value) {
            if (value === this._local.x)
                return;
            this._local.x = value;
            this.setDirty(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicsNode.prototype, "y", {
        get: function () {
            return this._local.y;
        },
        set: function (value) {
            if (value === this._local.y)
                return;
            this._local.y = value;
            this.setDirty(true);
        },
        enumerable: false,
        configurable: true
    });
    GraphicsNode.prototype.setWidth = function (value) {
        if (value === this._width)
            return;
        this._width = value;
        this.setDirty(true);
    };
    GraphicsNode.prototype.setHeight = function (value) {
        if (value === this._height)
            return;
        this._height = value;
        this.setDirty(true);
    };
    Object.defineProperty(GraphicsNode.prototype, "world", {
        get: function () {
            return this._world;
        },
        enumerable: false,
        configurable: true
    });
    /** 渲染 */
    GraphicsNode.prototype.render = function (dirty) {
        var _a, _b, _c, _d;
        //如果父链中它之上的任何物体标记为脏，则它将被置为true
        dirty = dirty || this._dirty;
        //而当节点没有改动时（dirty=false），跳过combine的过程，否则，表示此链为脏，进行combine
        if (dirty) {
            var parentWorldX = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.world.x) !== null && _b !== void 0 ? _b : 0;
            var parentWorldY = (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.world.y) !== null && _d !== void 0 ? _d : 0;
            this._world.x = this._local.x + parentWorldX;
            this._world.y = this._local.y + parentWorldY;
            this.setDirty(false);
            this.renderImage();
        }
        this.children.forEach(function (child) {
            child.render(dirty);
        });
    };
    GraphicsNode.prototype.renderImage = function () {
        var _this = this;
        if (!this._image) {
            this._image = new Image();
        }
        if (this._imageSrc !== this._src) {
            this._image.onload = function () {
                _this.drawImage();
            };
            this.setImageSrc(this._src);
        }
        else {
            this.drawImage();
        }
    };
    GraphicsNode.prototype.drawImage = function () {
        var _a, _b;
        global_1.default.ctx.drawImage(this._image, this._world.x, this._world.y, (_a = this._width) !== null && _a !== void 0 ? _a : this._image.width, (_b = this._height) !== null && _b !== void 0 ? _b : this._image.height);
    };
    GraphicsNode.prototype.addChild = function (child) {
        this.children.push(child);
        child.parent = this;
    };
    return GraphicsNode;
}());
exports.default = GraphicsNode;
