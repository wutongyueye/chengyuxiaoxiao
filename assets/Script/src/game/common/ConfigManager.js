"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils_1 = require("./../../utils/StringUtils");
var ConfigManagerClass = (function () {
    function ConfigManagerClass() {
        this._idiomJson = new Map();
    }
    Object.defineProperty(ConfigManagerClass, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new ConfigManagerClass();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManagerClass.prototype, "idiomJsonMap", {
        get: function () {
            return this._idiomJson;
        },
        enumerable: true,
        configurable: true
    });
    ConfigManagerClass.prototype.load = function () {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            cc.loader.loadResDir("jsons", function (error, datas, urls) {
                if (error) {
                    cc.error(error);
                    return;
                }
                for (var i = 0; i < datas.length; i++) {
                    var name_1 = StringUtils_1.StringUtils.getName(urls[i]);
                    var data = datas[i];
                    if (name_1 == "idiom") {
                        _this.loadIdiomJson(data.json);
                    }
                }
                return fulfill();
            });
        });
    };
    ConfigManagerClass.prototype.loadIdiomJson = function (datas) {
        if (datas == null) {
            return;
        }
        for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
            var idiom = datas_1[_i];
            this._idiomJson.set(Number(idiom.ID), idiom.chengyu);
        }
        cc.log("成语数据", this._idiomJson);
    };
    return ConfigManagerClass;
}());
exports.ConfigManager = ConfigManagerClass.instance;