(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/src/core/event/DefaultGameListener.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd01d2fKxDtOqIdyQZoKiamN', 'DefaultGameListener', __filename);
// Script/src/core/event/DefaultGameListener.js

"use strict";

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var GameEventListener_1 = require("./GameEventListener");
var DefaultGameListener = function (_super) {
    __extends(DefaultGameListener, _super);
    function DefaultGameListener(eventCode, handle) {
        var _this = _super.call(this, eventCode) || this;
        _this._handle = handle;
        return _this;
    }
    DefaultGameListener.prototype.onEvent = function (event) {
        this._handle.call(this._handle, event);
    };
    DefaultGameListener.of = function (eventCode, handle) {
        return new DefaultGameListener(eventCode, handle);
    };
    return DefaultGameListener;
}(GameEventListener_1.GameEventListener);
exports.DefaultGameListener = DefaultGameListener;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=DefaultGameListener.js.map
        