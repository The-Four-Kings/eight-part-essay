"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 雪糕
 * @description 渲染节点
 */
var GraphicsNode = /** @class */ (function () {
    function GraphicsNode(source) {
        this._local = { x: 0, y: 0 };
        this._world = { x: 0, y: 0 };
        this.children = [];
        if (source) {
            this.image.src = this._source = source;
        }
    }
    Object.defineProperty(GraphicsNode.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: false,
        configurable: true
    });
    GraphicsNode.prototype.setStage = function (value) {
        this._stage = value;
        if (this._dirty) {
            this._stage.setDirty(true);
        }
    };
    GraphicsNode.prototype.setDirty = function (value) {
        var _a;
        if (!value)
            return;
        this._dirty = value;
        (_a = this._stage) === null || _a === void 0 ? void 0 : _a.setDirty(true);
    };
    Object.defineProperty(GraphicsNode.prototype, "image", {
        get: function () {
            var _this = this;
            if (this._image)
                return this._image;
            this._image = new Image();
            this._image.onload = function () {
                _this.setDirty(true);
                if (!_this._width) {
                    _this._width = _this._image.width;
                }
                if (!_this._height) {
                    _this._height = _this._image.height;
                }
            };
            return this._image;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicsNode.prototype, "source", {
        set: function (value) {
            if (this._source === value)
                return;
            this.image.src = this._source = value;
            this.setDirty(true);
        },
        enumerable: false,
        configurable: true
    });
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
    Object.defineProperty(GraphicsNode.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (value === this._width)
                return;
            this._width = value;
            this.setDirty(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicsNode.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (value === this._height)
                return;
            this._height = value;
            this.setDirty(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphicsNode.prototype, "world", {
        get: function () {
            return this._world;
        },
        enumerable: false,
        configurable: true
    });
    /** 渲染 */
    GraphicsNode.prototype.render = function () {
        var _a, _b, _c, _d;
        //而当节点没有改动时（dirty=false），跳过combine的过程，否则，表示此链为脏，进行combine
        this._world.x = this._local.x + ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.world.x) !== null && _b !== void 0 ? _b : 0);
        this._world.y = this._local.y + ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.world.y) !== null && _d !== void 0 ? _d : 0);
        this.drawImage();
        this.children.forEach(function (child) {
            child.render();
        });
    };
    GraphicsNode.prototype.drawImage = function () {
        var _a, _b;
        if (!this._image)
            return;
        var renderWidth = (_a = this._width) !== null && _a !== void 0 ? _a : this._image.width;
        var renderHeight = (_b = this._height) !== null && _b !== void 0 ? _b : this._image.height;
        this._stage.ctx.drawImage(this._image, this._world.x, this._world.y, renderWidth, renderHeight);
    };
    GraphicsNode.prototype.addChild = function (child) {
        this.children.push(child);
        child.parent = this;
        child.setStage(this._stage);
        this.setDirty(true);
    };
    GraphicsNode.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index < 0)
            return;
        this.children.splice(index, 1);
        this.setDirty(true);
    };
    GraphicsNode.prototype.$update = function (deltaTime) {
        this.children.forEach(function (child) {
            child.$update(deltaTime);
        });
        this.onUpdate(deltaTime);
    };
    GraphicsNode.prototype.onUpdate = function (deltaTime) {
        //
    };
    return GraphicsNode;
}());
exports.default = GraphicsNode;
