"use strict";
cc._RF.push(module, '13600cpS0dNAoBQ5GfuI+vu', 'Vec2');
// Script/src/utils/Vec2.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vec2 = function () {
    function Vec2(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vec2.prototype, "x", {
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2.prototype, "y", {
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Vec2.prototype.toNumber = function () {
        return this._x * 10000 + this._y;
    };
    return Vec2;
}();
exports.Vec2 = Vec2;

cc._RF.pop();