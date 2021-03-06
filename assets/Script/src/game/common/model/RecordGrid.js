"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecordGridClass = (function () {
    function RecordGridClass() {
        this.chooseGridMap = new Map();
        this.gameTableGridMap = new Map();
        this.tempChooseGridMap = new Map();
        this.lastIdiomAry = [];
    }
    Object.defineProperty(RecordGridClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new RecordGridClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    RecordGridClass.prototype.setGameTableGridMap = function (index, grid) {
        if (typeof (index) == "number" && typeof (grid) != null) {
            this.gameTableGridMap.set(index, grid);
        }
    };
    RecordGridClass.prototype.getGameTableGridMap = function () {
        return this.gameTableGridMap;
    };
    RecordGridClass.prototype.setChooseGridMap = function (index, grid) {
        if (typeof (grid) != null) {
            this.chooseGridMap.set(index, grid);
        }
    };
    RecordGridClass.prototype.getChooseGridMap = function () {
        return this.chooseGridMap;
    };
    RecordGridClass.prototype.settempChooseGridMap = function (index, str) {
        if (typeof (str) != null) {
            this.tempChooseGridMap.set(index, str);
        }
    };
    RecordGridClass.prototype.gettempChooseGridMap = function () {
        return this.tempChooseGridMap;
    };
    RecordGridClass.prototype.initLastIdiomAry = function (idiomAry) {
        this.lastIdiomAry = idiomAry;
    };
    RecordGridClass.prototype.reduceLastIdiomAry = function (idiom) {
        var _this = this;
        this.lastIdiomAry.forEach(function (value, key) {
            if (idiom == value) {
                _this.lastIdiomAry.splice(key, key + 1);
            }
        });
    };
    RecordGridClass.prototype.getLastIdiomAry = function () {
        return this.lastIdiomAry;
    };
    RecordGridClass.prototype.displayGrid = function (str, index) {
        if (typeof (str) != "string" || typeof (index) != "number" || str == "") {
            return;
        }
        this.gameTableGridMap.get(index).setGridString(str);
        this.gameTableGridMap.delete(index);
    };
    RecordGridClass.prototype.clearRecordData = function () {
        this.chooseGridMap.clear();
    };
    RecordGridClass.prototype.clearTempRecordData = function () {
        this.tempChooseGridMap.clear();
    };
    RecordGridClass.prototype.onGameOver = function () {
        this.clearRecordData();
        this.gameTableGridMap.clear();
    };
    RecordGridClass.prototype.onClearAll = function () {
        this.clearRecordData();
        this.gameTableGridMap.clear();
    };
    return RecordGridClass;
}());
exports.RecordGrid = RecordGridClass.instance;
