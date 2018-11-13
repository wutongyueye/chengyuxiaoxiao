(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/src/game/common/GameEngine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '521a4IkrA5M1aLJXwKYAosM', 'GameEngine', __filename);
// Script/src/game/common/GameEngine.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoginService_1 = require("./service/LoginService");
var LocalStorage_1 = require("../../core/common/LocalStorage");
var Http_1 = require("../../core/net/Http");
var GameEventTransmitter_1 = require("../../core/event/GameEventTransmitter");
var DefaultGameEvent_1 = require("../../core/event/DefaultGameEvent");
var GameDataManager_1 = require("./data/GameDataManager");
var Audio_1 = require("../../core/common/Audio");
var GameEngineClass = function () {
    function GameEngineClass() {
        this.loginServerUrl = "http://127.0.0.1:9099/dzk/";
        this._playerIdKey = "#___player_id__0.2";
        this._loginService = new LoginService_1.LoginService();
        this._localStorage = new LocalStorage_1.LocalStorage();
        this._http = new Http_1.Http(this.loginServerUrl);
        this._audio = new Audio_1.Audio(1, 1);
    }
    Object.defineProperty(GameEngineClass, "instance", {
        get: function get() {
            if (this._instance == null) {
                this._instance = new GameEngineClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEngineClass.prototype, "loginService", {
        get: function get() {
            return this._loginService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEngineClass.prototype, "localStorage", {
        get: function get() {
            return this._localStorage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEngineClass.prototype, "http", {
        get: function get() {
            return this._http;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEngineClass.prototype, "audio", {
        get: function get() {
            return this._audio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameEngineClass.prototype, "playerIdKey", {
        get: function get() {
            return this._playerIdKey;
        },
        enumerable: true,
        configurable: true
    });
    GameEngineClass.prototype.showTips = function (message) {};
    GameEngineClass.prototype.changeScene = function (scene) {
        cc.director.loadScene(scene);
    };
    GameEngineClass.prototype.currentScene = function () {
        return cc.director.getScene();
    };
    GameEngineClass.prototype.currentSceneNode = function () {
        return cc.director.getScene().getChildByName('Canvas');
    };
    GameEngineClass.prototype.doPost = function (url, params, eventCode) {
        var _this = this;
        this._http.httpPost(url, params, function (ret) {
            if (!ret.success) {
                _this.showTips(ret.message);
                return;
            }
            var data = ret.data;
            GameDataManager_1.GameDataManager.dataChange(data);
            if (eventCode && eventCode != 0) {
                GameEventTransmitter_1.GameEventTransmitter.emit(DefaultGameEvent_1.DefaultGameEvent.of(eventCode, data));
            }
        });
    };
    GameEngineClass.prototype.shareGame = function () {};
    return GameEngineClass;
}();
exports.GameEngine = GameEngineClass.instance;

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
        //# sourceMappingURL=GameEngine.js.map
        