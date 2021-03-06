(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/src/game/rank/wxRankView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42eedk47mtDKIm0esLRB/uF', 'wxRankView', __filename);
// Script/src/game/rank/wxRankView.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameEngine_1 = require("../../game/common/GameEngine");
var GameDataManager_1 = require("../../game/common/data/GameDataManager");
var GameAudio_1 = require("../common/helper/GameAudio");
var GameSceneHepler_1 = require("../common/helper/GameSceneHepler");
var _a = cc._decorator,
    ccclass = _a.ccclass,
    property = _a.property;
var wxRankView = function (_super) {
    __extends(wxRankView, _super);
    function wxRankView() {
        var _this = _super.call(this) || this;
        _this.btn_back = null;
        _this.btn_invite = null;
        _this.tex = null;
        return _this;
    }
    wxRankView.prototype.onLoad = function () {
        this.btn_back.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEventListener);
        this.btn_invite.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEventListener);
    };
    wxRankView.prototype.start = function () {
        this.tex = new cc.Texture2D();
        console.log("send");
        wx.getUserInfo({
            success: function success(event) {
                console.log(event);
            }
        });
        wx.getOpenDataContext().postMessage({
            EventType: "0",
            EventData: ""
        });
    };
    wxRankView.prototype.onDestroy = function () {
        wx.getOpenDataContext().postMessage({
            EventType: "3",
            EventData: ""
        });
    };
    wxRankView.prototype.onTouchEventListener = function (event) {
        var eventType = event.type;
        var eventName = event.target._name;
        GameAudio_1.GameAudio.playBtnEffect();
        if (eventType == "touchend") {
            switch (eventName) {
                case "btn_back":
                    GameAudio_1.GameAudio.playBtnEffect();
                    GameDataManager_1.GameDataManager.gameData.refuseData();
                    GameEngine_1.GameEngine.changeScene(GameSceneHepler_1.GameSceneHepler.LOADING);
                    break;
                case "btn_invite":
                    this.shareGroup();
                default:
                    break;
            }
        }
    };
    wxRankView.prototype.shareGroup = function () {
        wx.shareAppMessage({
            title: "汉语六级你能考多少？试试就知道!",
            query: "sharePlayerId=" + GameDataManager_1.GameDataManager.userData.playerId,
            imageUrl: "https://liubowen.top/dzk-res/share/70001.png",
            success: function success(event) {
                console.log("微信分享返回数据 =>", event);
            }
        });
    };
    __decorate([property(cc.Button)], wxRankView.prototype, "btn_back", void 0);
    __decorate([property(cc.Button)], wxRankView.prototype, "btn_invite", void 0);
    wxRankView = __decorate([ccclass], wxRankView);
    return wxRankView;
}(cc.Component);
exports.wxRankView = wxRankView;

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
        //# sourceMappingURL=wxRankView.js.map
        