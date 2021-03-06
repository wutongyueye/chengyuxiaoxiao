"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var GameDataManager_1 = require("./../common/data/GameDataManager");
var ConfigManager_1 = require("../common/ConfigManager");
var GameResult_1 = require("./GameResult");
var StorageInfo_1 = require("../common/data/StorageInfo");
var GameManagerClass = (function () {
    function GameManagerClass() {
        this.gameTable = null;
        this.chooseView = null;
        this.gameScene = null;
    }
    GameManagerClass_1 = GameManagerClass;
    Object.defineProperty(GameManagerClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new GameManagerClass_1();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameManagerClass.prototype.setView = function (gameScene, gameTable, chooseView) {
        this.gameTable = gameTable;
        this.chooseView = chooseView;
        this.gameScene = gameScene;
    };
    GameManagerClass.prototype.getRandomIdiom = function () {
        return this.gameTable.getRandomIdiom();
    };
    GameManagerClass.prototype.onGameStart = function () {
        StorageInfo_1.StorageInfo.addPlayTimes();
        GameDataManager_1.GameDataManager.gameData.gameStart();
        this.loadGameFinish();
    };
    GameManagerClass.prototype.addGameTime = function () {
        this.addScheTIme();
        GameDataManager_1.GameDataManager.gameData.addgametime();
    };
    GameManagerClass.prototype.onGameLevelup = function () {
        this.addGameTime();
        GameDataManager_1.GameDataManager.gameData.addlevel();
        this.gameScene.setTopScore();
        this.gameScene.updateLevel();
        this.gameTable.onClearAll();
        this.chooseView.onClearAll();
        this.loadGameFinish();
    };
    GameManagerClass.prototype.addScheTIme = function () {
        var levelsInfo = ConfigManager_1.ConfigManager.levelsJsonMap.get(GameDataManager_1.GameDataManager.gameData.level);
        var value = levelsInfo.addtime || 0;
        this.gameScene.addScheTimes(value);
    };
    GameManagerClass.prototype.loadGameFinish = function () {
        this.chooseView.loadFinish();
        this.gameTable.setChooseView(this.chooseView);
        this.gameTable.setGameScene(this.gameScene);
        this.gameTable.loadFinish();
    };
    GameManagerClass.prototype.onGameOver = function () {
        this.gameTable.onGameOver();
        this.chooseView.onGameOver();
        this.gameScene.onGameOver();
        GameResult_1.GameResult.onGameOver();
    };
    var GameManagerClass_1;
    GameManagerClass = GameManagerClass_1 = __decorate([
        ccclass()
    ], GameManagerClass);
    return GameManagerClass;
}());
exports.GameManagerClass = GameManagerClass;
exports.GameManager = GameManagerClass.instance;
