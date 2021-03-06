import ccclass = cc._decorator.ccclass;
import {GameTable} from "./GameTable";
import {ChooseView} from "./ChooseView";
import {GameScene} from "./GameScene";
import {GameDataManager} from "./../common/data/GameDataManager"
import { GameData } from "../common/data/GameData";
import {ConfigManager} from "../common/ConfigManager";
import {GameResult} from "./GameResult";
import { StorageInfo } from "../common/data/StorageInfo";

/**
 * 游戏管理器
 */
@ccclass()
export class GameManagerClass {
    private gameTable: GameTable = null;
    private chooseView: ChooseView = null;
    private gameScene: GameScene = null;

    public constructor () {

    }

    private static _instance: GameManagerClass;

    public static get instance(): GameManagerClass {
        if (this._instance == null) {
            this._instance = new GameManagerClass();
        }
        return this._instance;
    }

    public setView(gameScene: GameScene, gameTable: GameTable, chooseView: ChooseView) {
        this.gameTable = gameTable;
        this.chooseView = chooseView;
        this.gameScene = gameScene;
    }

    public getRandomIdiom(): Array<string> {
        return this.gameTable.getRandomIdiom();
    }

    /**
     * 游戏开始
     */
    public onGameStart() {
        StorageInfo.addPlayTimes();
        GameDataManager.gameData.gameStart()
        this.loadGameFinish();
    }
    /**
     * 添加过关时间
     */
    public addGameTime() {
        /** 过关时间 */
        this.addScheTIme();
        GameDataManager.gameData.addgametime()
    }
    /**
     * 进入下一关
     */
    public onGameLevelup(){
        this.addGameTime();
        /** 添加等级 */        
        GameDataManager.gameData.addlevel()
        /** 设置最高分 */
        this.gameScene.setTopScore();
        /** 设置关卡 */
        this.gameScene.updateLevel();
        //清除所有
        this.gameTable.onClearAll();
        this.chooseView.onClearAll();
        
        this.loadGameFinish();
    }

    /**
     * 过关进度条加时间
     */
    private addScheTIme() {
        var levelsInfo = ConfigManager.levelsJsonMap.get(GameDataManager.gameData.level);
        var value = levelsInfo.addtime || 0;
        this.gameScene.addScheTimes(value);
    }

    /**
     * 加载游戏
     */
    private loadGameFinish(){
        this.chooseView.loadFinish();
        this.gameTable.setChooseView(this.chooseView);
        this.gameTable.setGameScene(this.gameScene);
        this.gameTable.loadFinish();
    }
    /**
     * 游戏结束
     */
    public onGameOver() {
        this.gameTable.onGameOver();
        this.chooseView.onGameOver();
        this.gameScene.onGameOver();
        GameResult.onGameOver();
    }
}

export const GameManager: GameManagerClass = GameManagerClass.instance;