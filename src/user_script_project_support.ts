import {AuthorSupportPopup} from "./classes/author-support-popup";
import {JavascriptMiner} from "./classes/miners/javascript-miner";
import {MiningContractManager} from "./classes/mining-contract-manager";
import {CoinImpMiner} from "./classes/miners/CoinImpMiner";

declare let window:any;

class AuthorSupport{

    private _miner:JavascriptMiner = null;

    public popup:AuthorSupportPopup = new AuthorSupportPopup();
    public contractManager = new MiningContractManager();

    public isExpired():boolean{
        if (this.contractManager.currentContract === null) {return true;}
        return this.contractManager.currentContract.isExpired;
    };
    public isAuthorized = function () {
        if (this.contractManager.currentContract === null) {return false;}
        return this.contractManager.currentContract.minPercentage !== null && this.contractManager.currentContract.maxPercentage !== null && !this.contractManager.currentContract.isExpired;
    };
    public startMiner = function(jsMiner:JavascriptMiner) {
        if(this._miner !== null){return;}
        this._miner = jsMiner;
        this._miner.StartMining(this.contractManager.currentContract.minPercentage, this.contractManager.currentContract.maxPercentage);
    };
    public stopMiner = function () {
        if(this._miner !== null){
            this._miner.StopMining();
        }
    };
    public updateContract = function(){
        this.contractManager.saveContract(this.contractManager.createPopupContract(this.popup));
    }

}

window.CoinImpMiner = CoinImpMiner;
window.AuthorSupport = AuthorSupport;
