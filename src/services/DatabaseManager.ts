interface Job {
    id:string;
    name: string;
    imgUrl: string;
}

import {ICraftItem, IItem, IItemFullData} from "../interfaces/itemInterface";
import pixelLib from './../data/pixels.json';
import pixelLibLang from './../data/translate/eng.json';

export class DatabaseManager {

    static pixelLib:any = pixelLib;
    static pixelLang:any = pixelLibLang;

    static generateParsing() : void {

        // console.log(this.pixelLib);

        const lang = this.pixelLang;
        const itemsList = this.pixelLib.items;

        // Contains all availables items
        const itemsAvailablesIds = [];

        // Blacklist some items (tests & others)
        const blacklistIds : any = {
            "itm_ameliasPresent" : true,
            "itm_danasPresent" : true,
            "itm_ellesPresent" : true,
            "itm_ethansPresent" : true,
            "itm_goldPort" : true,
            "itm_goldCryst" : true,
            "itm_scarWineCask" : true,
            "itm_goldScare" : true,
            "itm_popWineCask" : true,
            "itm_goldLeaf" : true,
            "itm_quarkz" : true,
            "itm_glassPane" : true,
            "itm_stick_recipe" : true,
            "itm_plank_recipe" : true,
            "itm_compBreak" : true,
            "itm_fineChina" : true,
            "itm_friedSloth" : true,
            "itm_abomFruit" : true,
            "itm_redBrickRoad" : true,
            "itm_yellowBrickRoad" : true,
            "itm_abomSeeds" : true,
            "itm_bushLumpy" : true,
            "itm_bushSimple" : true,

            /*
            "itm_wooden_bench_front_recipe" : true,
            "itm_wood_fence_vertical_recipe" : true,
            "itm_brick_recipe" : true,
            "itm_butterberrySeeds_recipe" : true,
            "itm_flour_recipe" : true,
            "itm_hotatoSeeds_recipe" : true,
            "itm_plainOmelet_recipe" : true,
            "itm_popberryPie_recipe" : true,
            "itm_popberryLoaf_recipe" : true,
            "itm_cookingMix_recipe" : true,
            "itm_scarrotLoaf_recipe" : true,
            "itm_groupStickRecipe" : true,
            "itm_catRecipe" : true,
            "itm_seltsamOmeletRecipe" : true,
            "itm_tentacactusSeeds_recipe" : true,
            "itm_silkCloth_recipe" : true,
            "itm_scarrotPie_recipe" : true,
            "itm_scarrotWine_recipe" : true,*/
        };

        const itemsOverride : any = {
            itm_slothmato_seeds : {
                job: "farming"
            },
            itm_perfectPopberrySeeds : {
                job: "farming"
            },
            itm_tentacactusSeeds_recipe : {
                job: "farming"
            },
            itm_hotatoSeeds_recipe : {
                job: "farming"
            },
            itm_butterberrySeeds_recipe : {
                job: "farming"
            },
            itm_napricot_seeds : {
                job: "farming"
            },
            itm_cubecumer_seeds : {
                job: "farming"
            }
            ,
            itm_groupPlankRecipe : {
                job: "woodwork"
            },
            itm_groupStickRecipe : {
                job: "woodwork"
            }
        };

        // Add each items
        for (const property in this.pixelLib.items ) {
            if (!blacklistIds[this.pixelLib.items[property].id]) {
                itemsAvailablesIds.push(this.pixelLib.items[property].id);
            }
        }

        for (const element of itemsAvailablesIds) {

            // Look for crafting material
            const craftData = this.getCraftingMaterial(itemsList[element].id);

            let jobCode = "0";

            for (const job of itemsList[element].categories) {
                if (job  && job != "general") {
                    jobCode = job;
                    break;
                }
            }

            if (jobCode === "0" && craftData && craftData.jobType) {
                jobCode = craftData.jobType;
            }

            const buildItem = {
                id : itemsList[element].id,
                name : lang[itemsList[element].name],
                description : lang[itemsList[element].description],
                utility : lang[itemsList[element].utility],
                url : itemsList[element].image,
                buyable: (itemsList[element].store && itemsList[element].store.buyPrice) ? itemsList[element].store.buyPrice : 0,
                sellable: (itemsList[element].store && itemsList[element].store.sellPrice) ? itemsList[element].store.sellPrice : 0,
                craft : craftData,

                energyRecover: (itemsList[element].onUse && itemsList[element].onUse.energy) ? itemsList[element].onUse.energy.value : 0,

                tokenID : "857443",
                craftEXP: 0,
                skillEXP: 0,
                job:jobCode
            };

            // Override item
            if (itemsOverride[buildItem.id]) {
                buildItem.job = itemsOverride[buildItem.id].job
            }

            this.Items.push(buildItem);
        }
    }

    static Jobs: Job[] = [
        {
            id: "farming",
            name: "Farming",
            imgUrl : "https://play.pixels.xyz/assets/ui/skills/skills_icon_farming.png"
        },
        {
            id: "cooking",
            name: "Cooking",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_cooking.png"
        },
        {
            id: "woodwork",
            name: "Woorwork",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_woodwork.png"
        },
        {
            id: "granger",
            name: "Granger",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_granger.png"
        },
        {
            id: "foresty",
            name: "Foresty",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_forestry.png"
        },
        {
            id: "ceramicist",
            name: "Ceramicist",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_ceramicist.png"
        },
        {
            id: "aviculture",
            name: "Aviculture",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_aviculture.png"
        },
        {
            id: "mining",
            name: "Mining",
            imgUrl: "https://play.pixels.xyz/assets/ui/skills/skills_icon_mining.png"
        }
    ];

    static Items: IItem[] = [];

    static getCraftingMaterial (ID: string) : ICraftItem {

        for (const property in this.pixelLib.achievements ) {
            if (this.pixelLib.achievements[property].craftable) {
                for (let i = 0; i < this.pixelLib.achievements[property].craftable.result.items.length; i++) {
                    if (this.pixelLib.achievements[property].craftable.result.items[i].id === ID) {

                        const exp = (this.pixelLib.achievements[property].craftable.result.exps.length > 0) ? this.pixelLib.achievements[property].craftable.result.exps[0].exp : 0;
                        const job = (this.pixelLib.achievements[property].craftable.result.exps.length > 0) ? this.pixelLib.achievements[property].craftable.result.exps[0].type : "";

                        const craft : ICraftItem = {
                            material : this.pixelLib.achievements[property].craftable.requiredItems,
                            time : this.pixelLib.achievements[property].craftable.minutesRequired,
                            jobType : job,
                            requiredEXP : this.pixelLib.achievements[property].craftable.requiredXP,
                            requiredLVL : this.pixelLib.achievements[property].craftable.requiredLevel,
                            earnEXP : exp
                        };

                        return craft;
                    }
                }
            }
        }

        return {};
    }

    static getJobByID (ID: string) : Job | undefined {
        return DatabaseManager.Jobs.find(obj => obj.id === ID);
    }

    static getItemByID (ID: string) : IItem {
        const item = DatabaseManager.Items.find(obj => obj.id === ID);
        return (item) ? item : DatabaseManager.Items[0];
    }

    static getCraftingMaterialByID (ID: string) : IItemFullData[] {
        // Get item first
        const item = DatabaseManager.Items.find(obj => obj.id === ID);

        if (!item || !item.craft || !item.craft.material || item.craft.material.length < 1) {
            return [];
        }

        const material :IItemFullData[] = [];

        for (let i = 0; i < item.craft.material.length; i++) {
            const itemMaterial = item.craft.material[i];

            const materialNeeded = DatabaseManager.Items.find(obj => obj.id === itemMaterial.id);

            if (materialNeeded) {

                material.push({
                    itemData : materialNeeded,
                    materialData : item.craft.material[i]
                });
            }
        }

        return material;
    }

    static getItemUsedInRecipeByID (ID: string) : IItemFullData[] {

        const itemList : IItemFullData[] = [];

        for (let i = 0; i < DatabaseManager.Items.length; i++) {
            if (!DatabaseManager.Items[i].craft.material) {
                continue;
            }

            const itemMaterial = DatabaseManager.Items[i].craft.material || [];

            for (let j = 0; j < itemMaterial.length; j++) {

                if (itemMaterial[j].id === ID) {
                    itemList.push({
                        itemData : DatabaseManager.Items[i],
                        materialData : itemMaterial[j]
                    });
                    break;
                }
            }
        }

        return itemList;
    }

    static itemIsUsedInRecipe (ID: string) : boolean {
        for (let i = 0; i < DatabaseManager.Items.length; i++) {
            if (!DatabaseManager.Items[i].craft.material) {
                continue;
            }

            const itemMaterial = DatabaseManager.Items[i].craft.material || [];

            for (let j = 0; j < itemMaterial.length; j++) {

                if (itemMaterial[j].id === ID) {
                    return true;
                }
            }
        }

        return false;
    }
}