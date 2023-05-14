export interface IItem {
    id : string;
    name: string;

    description?: string;
    utility?: string;

    url:string;
    buyable:number;
    sellable:number;
    job: string;
    blockchainAPI?: string;
    tokenID?: string;
    craftingMaterial ?: ICraftingMaterial[];

    craft : ICraftItem;

    skillEXP ?: number;
    craftEXP ?: number;

    store?: {
        buyPrice?: number;
        sellPrice?: number;
    }

    energyRecover ?:number;
}

export interface ICraftItem {
    material ?: ICraftingMaterial[];
    time ?: number;
    jobType ?: string;
    requiredEXP ?: number;
    requiredLVL ?: number;
    earnEXP ?: number;
}

export interface ICraftingMaterial {
    id : string;
    quantity: number;
}

export interface IItemFullData {
    itemData:IItem;
    materialData:ICraftingMaterial;
}