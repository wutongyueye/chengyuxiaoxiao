"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var property = cc._decorator.property;
var GameTable_1 = require("./../game/GameTable");
var ChooseView_1 = require("./../game/ChooseView");
var GameManager_1 = require("./GameManager");
var GameDataManager_1 = require("../common/data/GameDataManager");
var GameEngine_1 = require("../common/GameEngine");
var GameSceneHepler_1 = require("../common/helper/GameSceneHepler");
var GameResult_1 = require("./GameResult");
var GameAudio_1 = require("../common/helper/GameAudio");
var StorageInfo_1 = require("../common/data/StorageInfo");
var RecordGrid_1 = require("../common/model/RecordGrid");
var Tools_1 = require("../../utils/Tools");
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.gameTable = null;
        _this.chooseView = null;
        _this.bg_hong = null;
        _this.lbl_time = null;
        _this.lbl_score = null;
        _this.lbl_topScore = null;
        _this.lbl_level = null;
        _this.btn_back = null;
        _this.btn_tishi = null;
        _this.bar_time = null;
        _this.audio = null;
        _this.scheTimes = 0;
        _this.tipsScript = null;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
        GameManager_1.GameManager.setView(this, this.gameTable, this.chooseView);
        this.loadFinish();
    };
    GameScene.prototype.onDestroy = function () {
        GameDataManager_1.GameDataManager.gameData.refuseData();
        GameAudio_1.GameAudio.stopAll();
        this.onGameOver();
    };
    GameScene.prototype.loadFinish = function () {
        GameAudio_1.GameAudio.playGameMusic();
        this.setScore(GameDataManager_1.GameDataManager.gameData.score.toString());
        this.setTopScore();
        this.updateLevel();
        GameResult_1.GameResult.setGameScene(this);
        GameManager_1.GameManager.onGameStart();
        this.btn_back.on(cc.Node.EventType.TOUCH_END, this.onTouchEventListener, this);
        this.btn_tishi.on(cc.Node.EventType.TOUCH_START, this.onTouchEventListener, this);
        this.btn_tishi.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEventListener, this);
        this.btn_tishi.on(cc.Node.EventType.TOUCH_END, this.onTouchEventListener, this);
        this.createCDTime();
        this.createScheBar();
    };
    GameScene.prototype.onTouchEventListener = function (event) {
        var eventType = event.type;
        var eventName = event.target._name;
        GameAudio_1.GameAudio.playBtnEffect();
        if (eventType == "touchstart") {
            if (eventName == "btn_tishi") {
                if (this.tipsScript == null) {
                    var idiom = RecordGrid_1.RecordGrid.getLastIdiomAry()[0];
                    this.tipsScript = GameEngine_1.GameEngine.showTips(idiom);
                }
            }
        }
        else if (eventType == "touchend") {
            switch (eventName) {
                case "btn_back":
                    GameManager_1.GameManager.onGameOver();
                    GameEngine_1.GameEngine.changeScene(GameSceneHepler_1.GameSceneHepler.LOADING);
                    break;
                case "btn_tishi":
                    if (this.tipsScript != null) {
                        this.tipsScript.close();
                        this.tipsScript = null;
                    }
                    break;
                default:
                    break;
            }
        }
        else if (eventType == "touchcancel") {
            if (eventName == "btn_tishi") {
                if (this.tipsScript != null) {
                    this.tipsScript.close();
                    this.tipsScript = null;
                }
            }
        }
    };
    GameScene.prototype.createCDTime = function () {
        this.lbl_time.string = Tools_1.Tools.numberToDate(GameDataManager_1.GameDataManager.gameData.gametime);
        var timeCallback = function (dt) {
            GameDataManager_1.GameDataManager.gameData.gametime--;
            this.lbl_time.string = Tools_1.Tools.numberToDate(GameDataManager_1.GameDataManager.gameData.gametime);
            if (GameDataManager_1.GameDataManager.gameData.gametime <= 10) {
                this.bg_hong.node.active = true;
                this.playRemind();
            }
            else {
                if (this.bg_hong.node.active == true) {
                    this.bg_hong.node.active = false;
                }
            }
            if (GameDataManager_1.GameDataManager.gameData.gametime <= 0) {
                this.bar_time.progress = 0;
                GameManager_1.GameManager.onGameOver();
                GameEngine_1.GameEngine.changeScene(GameSceneHepler_1.GameSceneHepler.SETTLE);
            }
        };
        this.schedule(timeCallback, 1);
    };
    GameScene.prototype.createScheBar = function () {
        var time = GameDataManager_1.GameDataManager.gameData.totalGameTime * 0.01;
        this.scheTimes = 100;
        var barCallback = function (dt) {
            this.scheTimes--;
            var percent = this.scheTimes * 0.01;
            this.bar_time.progress = percent;
        };
        if (time < 0) {
            return;
        }
        this.schedule(barCallback, time);
    };
    GameScene.prototype.addScheTimes = function (time) {
        if (typeof (time) == "number") {
            var percent = time / GameDataManager_1.GameDataManager.gameData.totalGameTime * 100;
            this.scheTimes += percent;
        }
    };
    GameScene.prototype.playRemind = function () {
        var fadeIn = cc.fadeIn(0.25);
        var fadeOut = cc.fadeOut(0.25);
        this.bg_hong.node.runAction(cc.sequence(fadeIn, fadeOut));
    };
    GameScene.prototype.resetCDTime = function () {
        this.onGameOver();
        this.createCDTime();
        this.createScheBar();
    };
    GameScene.prototype.onGameOver = function () {
        this.unscheduleAllCallbacks();
    };
    GameScene.prototype.setScore = function (score) {
        if (typeof (score) != "string") {
            return;
        }
        this.lbl_score.string = score;
    };
    GameScene.prototype.setTopScore = function () {
        this.lbl_topScore.string = StorageInfo_1.StorageInfo.getTopScore().toString();
    };
    GameScene.prototype.updateLevel = function () {
        this.lbl_level.string = "第" + GameDataManager_1.GameDataManager.gameData.level.toString() + "关";
    };
    __decorate([
        property(GameTable_1.GameTable)
    ], GameScene.prototype, "gameTable", void 0);
    __decorate([
        property(ChooseView_1.ChooseView)
    ], GameScene.prototype, "chooseView", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameScene.prototype, "bg_hong", void 0);
    __decorate([
        property(cc.Label)
    ], GameScene.prototype, "lbl_time", void 0);
    __decorate([
        property(cc.Label)
    ], GameScene.prototype, "lbl_score", void 0);
    __decorate([
        property(cc.Label)
    ], GameScene.prototype, "lbl_topScore", void 0);
    __decorate([
        property(cc.Label)
    ], GameScene.prototype, "lbl_level", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "btn_back", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "btn_tishi", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], GameScene.prototype, "bar_time", void 0);
    GameScene = __decorate([
        ccclass()
    ], GameScene);
    return GameScene;
}(cc.Component));
exports.GameScene = GameScene;
