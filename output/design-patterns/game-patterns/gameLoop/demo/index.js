(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__dirname){(function (){
"use strict";
/**
 * @author 雪糕
 * @description
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.img_star = exports.img_purpleMonster = exports.img_ground = exports.img_btn_play = exports.img_background = exports.img_four_king = exports.img_bunny = void 0;
var imageFolderPath = "".concat(__dirname, "/../../resource/image");
exports.img_bunny = "".concat(imageFolderPath, "/bunny.png");
exports.img_four_king = "".concat(imageFolderPath, "/four_king.png");
exports.img_background = "".concat(imageFolderPath, "/monster/background.jpg");
exports.img_btn_play = "".concat(imageFolderPath, "/monster/btn_play.png");
exports.img_ground = "".concat(imageFolderPath, "/monster/ground.png");
exports.img_purpleMonster = "".concat(imageFolderPath, "/monster/purpleMonster.png");
exports.img_star = "".concat(imageFolderPath, "/monster/star.png");

}).call(this)}).call(this,"/output/config")
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./GraphicsNode":2}],4:[function(require,module,exports){
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

},{"../../../../config/imageCfg":1,"./GraphicsNode":2,"./Monster":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stage_1 = require("./Stage");
var preTimestamp;
var stage = new Stage_1.default();
var MS_PER_UPDATE = 1000 / 30;
var remainTime = 0;
//自定义帧率
requestAnimationFrame(onTick);
function onTick(timestamp) {
    if (!preTimestamp) {
        preTimestamp = timestamp;
    }
    var deltaTime = timestamp - preTimestamp;
    preTimestamp = timestamp;
    remainTime += deltaTime;
    while (remainTime >= MS_PER_UPDATE) {
        stage.$update(MS_PER_UPDATE);
        remainTime -= MS_PER_UPDATE;
    }
    requestAnimationFrame(onTick);
}
// //根据浏览器默认帧率
// requestAnimationFrame(onTick);
// function onTick(timestamp: number): void {
//     if (!preTimestamp) {
//         preTimestamp = timestamp;
//     }
//     const deltaTime = timestamp - preTimestamp;
//     preTimestamp = timestamp;
//     stage.$update(deltaTime);
//     requestAnimationFrame(onTick);
// }
//setTimeout 实现自定义帧率
// preTimestamp = Date.now();
// function ticker() {
//     setTimeout(() => {
//         const currentTime = Date.now();
//         const deltaTime = currentTime - preTimestamp;
//         preTimestamp = currentTime;
//         remainTime += deltaTime;
//         while (remainTime >= MS_PER_UPDATE) {
//             stage.$update(MS_PER_UPDATE);
//             remainTime -= MS_PER_UPDATE;
//         }
//         ticker();
//     }, 1);
// }
// ticker();

},{"./Stage":4}]},{},[5]);
