export interface IFarmRankDataInterface {
    aviculture : IFarmRankInterface[];
    cooking : IFarmRankInterface[];
    farming : IFarmRankInterface[];
    forestry : IFarmRankInterface[];
    granger : IFarmRankInterface[];
    woodwork : IFarmRankInterface[];
}

export interface IFarmRankLevelInterface {
    level : number;
    exp : number;
    totalExp : number;
}

export interface IFarmRankInterface {
    id : string;
    name : string;
    nft : {
        tokenId : number
    }

    levels : {
        aviculture: IFarmRankLevelInterface;
        cooking: IFarmRankLevelInterface;
        farming : IFarmRankLevelInterface;
        forestry: IFarmRankLevelInterface;
        granger: IFarmRankLevelInterface;
        woodwork: IFarmRankLevelInterface;
    }
}