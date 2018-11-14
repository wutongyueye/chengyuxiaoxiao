import {ConfigManager} from "./../ConfigManager";

/**
 * 此类用于根据成语json随机生成指定的成语配置表
 */
export class RandomAry{
    /** 需求值 */
    private needValus: number = null;
    /** 原始数据长度 */
    private configLength: number = null;
    /** 原始数据 */
    private jsonData: Map<number, string> = new Map<number, string>();
    /** 生成数据 */
    private produceArray: Array<string> = null;

    public constructor(need: number) {
        this.needValus = need;
        this.jsonData = ConfigManager.idiomJsonMap;
        this.produceArray = [];
        this.configLength = this.getMapLength(this.jsonData);
        this.init();
    }

    private init() {
        if (this.configLength <= 0) {
            cc.log("json读取失败");
            return
        }
        /** 获取随机数组 */
        let randomAry = this.getRandomAry();
        /** 转化为随机成语 */
        let randomIdiom = this.getRandomAryIdiom(randomAry);
        /** 拆分随机字 */
        this.produceArray = this.getSplitArray(randomIdiom);
    }

    public getProduceArray(): Array<string> {
        return this.produceArray;
    }

    private getMapLength(map: Map<any, any>): number {
        let lenght: number = 0;
        map.forEach(value=>{
            lenght++;
        })
        return lenght;
    }

    private getRandomAry(): Array<number> {
        let randomAry: Array<number> = [];
        for(var i=0; i<this.needValus; i++) {
            let rand = Math.trunc(Math.random() * this.configLength);
            let isOk = true;
            for(var j=0; j<randomAry.length; j++) {
                if (randomAry[j] == rand) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                randomAry.push(rand);
            }
        }
        return randomAry;
    }

    private getRandomAryIdiom(arr: Array<number>): Array<string>{
        let idiomAry: Array<string> = [];
        for(var i=0; i<arr.length; i++) {
            let v: number = arr[i];
            let s: string = v.toString();
            idiomAry.push(this.jsonData.get(v));
        }
        return idiomAry;
    }

    private getSplitArray(arr: Array<string>): Array<string>{
        let produceArray: Array<string> = [];
        for (var i=0; i<arr.length; i++) {
            let v: string = arr[i];
            for (var j=0; j<v.length; j++) {
                let s: string = v.substring(j, j+1);
                produceArray.push(s);
            }
        }
        var produceLength = produceArray.length;
        for (var i=0; i<produceLength; i++) {
            let rand = Math.floor(Math.random() * produceLength)
            if (i != rand) {
                let temp = produceArray[i];
                produceArray[i] = produceArray[rand];
                produceArray[rand] = temp;
            }
        }
        return produceArray;
    }

}