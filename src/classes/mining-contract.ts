export class MiningContract{

    public expiration:Date;
    public minPercentage:number;
    public maxPercentage:number;

    public static fromJson(json:string):MiningContract{
        let savedContract = JSON.parse(json) as MiningContract;
        let contract = new MiningContract();
        contract.expiration = savedContract.expiration;
        contract.minPercentage = savedContract.minPercentage;
        contract.maxPercentage = savedContract.maxPercentage;
        return contract;
    }

    public get isExpired(){
        return this.expiration !== null && this.expiration <= new Date();
    }

}