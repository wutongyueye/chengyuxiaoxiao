(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/src/game/game/GameResult.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '97be37yWVNJZIYOpkjF/kBY', 'GameResult', __filename);
// Script/src/game/game/GameResult.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("../../utils/Tools");
var GameManager_1 = require("./GameManager");
var RecordGrid_1 = require("../common/model/RecordGrid");
var GameDataManager_1 = require("../common/data/GameDataManager");
var GameAudio_1 = require("../common/helper/GameAudio");
var GameResultClass = function () {
    function GameResultClass() {
        this.randomAry = null;
        this.gameTable = null;
        this.chooseView = null;
        this.gameScene = null;
        this.isStartResult = false;
    }
    Object.defineProperty(GameResultClass, "instance", {
        get: function get() {
            if (this._instance == null) {
                this._instance = new GameResultClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameResultClass.prototype.setView = function (gameTable, chooseView) {
        this.gameTable = gameTable;
        this.chooseView = chooseView;
    };
    GameResultClass.prototype.setGameScene = function (scene) {
        this.gameScene = scene;
    };
    GameResultClass.prototype.getIsStartResult = function () {
        return this.isStartResult;
    };
    GameResultClass.prototype.startResult = function (idiomAry) {
        this.isStartResult = true;
        var chooseMap = RecordGrid_1.RecordGrid.getChooseGridMap();
        var endIdiom = "";
        var isSussess = false;
        for (var i = 0; i < idiomAry.length; i++) {
            var idiom = idiomAry[i];
            var isEqual = true;
            for (var j = 0; j < 4; j++) {
                if (idiom.substring(j, j + 1) != chooseMap.get(j).getGridString()) {
                    isEqual = false;
                    break;
                }
            }
            if (isEqual) {
                isSussess = true;
                endIdiom = idiom;
                break;
            }
        }
        if (isSussess) {
            RecordGrid_1.RecordGrid.reduceLastIdiomAry(endIdiom);
            this.chooseView.playChooseFadeOut();
            RecordGrid_1.RecordGrid.clearRecordData();
            var cb1 = cc.callFunc(this.onSuccessFul, this);
            this.gameTable.node.runAction(cc.sequence(cc.delayTime(GameDataManager_1.GameDataManager.gameData.gridEffectTime), cb1));
        } else {
            this.onFailed();
        }
    };
    GameResultClass.prototype.onSuccessFul = function () {
        this.chooseView.clearChooseGrid();
        this.chooseView.playChooseFadeIn();
        GameDataManager_1.GameDataManager.gameData.addscore(4);
        this.gameScene.setScore(GameDataManager_1.GameDataManager.gameData.score.toString());
        this.gameScene.setTopScore();
        GameAudio_1.GameAudio.playJudgeRightEffect();
        this.gameScene.updateLevel();
        this.isStartResult = false;
        this.chooseView.resetTempData();
        cc.log(Tools_1.Tools.getGridNumber(this.gameTable.tableWidth, this.gameTable.tableHeight));
        if (Tools_1.Tools.getMapLength(RecordGrid_1.RecordGrid.getGameTableGridMap()) == 4 * Tools_1.Tools.getGridNumber(this.gameTable.tableWidth, this.gameTable.tableHeight)) {
            GameDataManager_1.GameDataManager.gameData.gametime = GameDataManager_1.GameDataManager.gameData.totalGameTime;
            GameManager_1.GameManager.onGameLevelup();
        } else {
            var rewardTime = 1;
            GameDataManager_1.GameDataManager.gameData.gametime = GameDataManager_1.GameDataManager.gameData.gametime + rewardTime;
            this.gameScene.addScheTimes(rewardTime);
        }
    };
    GameResultClass.prototype.onFailed = function () {
        GameAudio_1.GameAudio.playJudgeErrorEffect();
        this.chooseView.restoreIdiom();
        this.clearData();
        this.isStartResult = false;
    };
    GameResultClass.prototype.clearData = function () {
        RecordGrid_1.RecordGrid.clearRecordData();
        this.chooseView.clearChooseGrid();
    };
    return GameResultClass;
}();
exports.GameResult = GameResultClass.instance;

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
        //# sourceMappingURL=GameResult.js.map
        