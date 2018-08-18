import {MiningContract} from "./mining-contract";
import {AuthorSupportPopup} from "./author-support-popup";
import './extensions';

export class MiningContractManager{

    private _currentContract:MiningContract = null;
    private _contractStorageKey:string = "author_support_mining_contract";

    public get currentContract():MiningContract{
        if (this._currentContract !== null) {
            return this._currentContract;
        }
        let savedContract = window.localStorage.getItem(this._contractStorageKey) || null;
        if (savedContract === null) {
            return null;
        }
        this._currentContract = MiningContract.fromJson(savedContract);
        return this._currentContract;
    };

    public createPopupContract(popup:AuthorSupportPopup):MiningContract{
        let contract = new MiningContract();
        switch (popup.cpuOption) {
            case 25:
                contract.minPercentage = 0;
                contract.maxPercentage = 25;
                break;
            case 50:
                contract.minPercentage = 25;
                contract.maxPercentage = 50;
                break;
            case 75:
                contract.minPercentage = 50;
                contract.maxPercentage = 75;
                break;
            case 100:
                contract.minPercentage = 75;
                contract.maxPercentage = 100;
                break;
        }
        switch (popup.contractOption) {
            case 0:
                contract.expiration = new Date().addDays(1);
                break;
            case 1:
                contract.expiration = new Date().addDays(2);
                break;
            case 2:
                contract.expiration = new Date().addDays(4);
                break;
            case 3:
                contract.expiration = new Date().addDays(8);
                break;
        }
        return contract;
    };
    public saveContract(contract:MiningContract) {
        this._currentContract = contract;
        window.localStorage.setItem(this._contractStorageKey, JSON.stringify(contract));
    };

}

