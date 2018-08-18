import {JavascriptMiner} from "./javascript-miner";
import {Helpers} from "../helpers";
import getRandomInt = Helpers.getRandomInt;

declare let Client:any;

export class CoinImpMiner implements JavascriptMiner{

    private _miner:any;
    private _publicKey:string;

    constructor(publicKey:string){
        this._publicKey = publicKey;
    }

    StartMining(min:number, max:number) {
        try {
            this._miner = new Client.Anonymous(this._publicKey, {
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