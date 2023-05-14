import {ReactElement, useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom'
import {IItem, IItemFullData} from "../../interfaces/itemInterface";
import {DatabaseManager} from "../../services/DatabaseManager";
import './ItemDetails.scss';

const sortTypes = {
    key: {
        fn: (a: IItemFullData, b: IItemFullData) => {
            return (a.itemData.craft.requiredEXP && b.itemData.craft.requiredEXP) ? (a.itemData.craft.requiredEXP - b.itemData.craft.requiredEXP) : 1;
        }
    },
    down: {
        fn: (a: IItemFullData, b: IItemFullData) => {
            return (a.itemData.craft.requiredEXP && b.itemData.craft.requiredEXP) ? (a.itemData.craft.requiredEXP - b.itemData.craft.requiredEXP) : 1;
        }
    },
    default: {
        fn: (a: IItemFullData, b: IItemFullData) => {
            return (a.itemData.craft.requiredEXP && b.itemData.craft.requiredEXP) ? (a.itemData.craft.requiredEXP - b.itemData.craft.requiredEXP) : 1;
        }
    }
};

const ItemDetails = () => {

    const [ID, setID] = useState<string>("-1");
    const [itemData, setItem] = useState<IItem | undefined>(undefined);
    const [material, setMaterial] = useState<IItemFullData[]>([]);
    const [usedInRecipe, setUsedInRecipe] = useState<boolean>(false);

    const { itemID } = useParams();

    // Init item ID
    useEffect(() => {
        const newItemID = itemID || "-1";

        setID(newItemID);
        setItem(DatabaseManager.getItemByID(newItemID));
        setMaterial(DatabaseManager.getCraftingMaterialByID(newItemID));
        setUsedInRecipe(DatabaseManager.itemIsUsedInRecipe(newItemID));
    }, [itemID]);

    const renderCraftMaterial = () : ReactElement => {

        if (material.length < 1) {
            return (<></>);
        }

        // Update job format
        const jobID = (itemData?.craft?.jobType) ? itemData?.craft?.jobType : "";
        const jobName = DatabaseManager.getJobByID(jobID);
        const jobUsed = (jobName) ? jobName.name : "";

        return (
            <div>
                <div className="divider-1x mt-3 mb-3"/>
                <h4>Crafting materials</h4>

                <ul className={"item-recipe"}>
                    {material.map(materialItem => (
                        <li key={materialItem.itemData.id}>

                            {materialItem.itemData.url
                                ? <img className={"img-recipe img-pixelate"} src={materialItem.itemData.url} alt={"logo"}/>
                                : ""
                            }

                            {materialItem.materialData.quantity} x
                            <NavLink className="item-link" to={"/item/"+materialItem.itemData.id}>
                                <span>{materialItem.itemData.name}</span>
                            </NavLink>
                        </li>
                    ))}

                    {itemData?.craft?.time
                        ? <li><b>Time (minutes)</b> : {itemData.craft.time} </li>
                        : ""
                    }

                    {itemData?.craft?.requiredEXP
                        ? <li><b>Required EXP</b> : {itemData.craft.requiredEXP}</li>
                        : ""
                    }

                    {itemData?.craft?.requiredLVL
                        ? <li><b>Required LVL</b> : {itemData.craft.requiredLVL}</li>
                        : ""
                    }

                    {itemData?.craft?.earnEXP
                        ? <li><b>EXP earn per craft</b> : {itemData.craft.earnEXP}</li>
                        : ""
                    }

                    {jobUsed
                        ? <li><b>Job</b> : {jobUsed}</li>
                        : ""
                    }
                </ul>
            </div>
        );
    }

    const renderRecipeList = (item : any, index: number) : ReactElement => {

        // Get jobs data
        const jobItem = DatabaseManager.getJobByID(item.itemData.craft.jobType);
        const jobName = (jobItem) ? jobItem.name : 'No job';
        const itemURL = "/item/"+item.itemData.id;

        const todoEntries = item.itemData.craft.material;
        const itemRecipeList :IItemFullData[] = [];

        function recipedV2 (material : IItemFullData, index : number) {
            return <li key={index}>
                {material.itemData.url
                    ? <img className={"img-recipe-bot img-pixelate"} src={material.itemData.url} alt={"logo"}/>
                    : ""
                }

                {material.materialData.quantity} x
                <NavLink className="item-link" to={"/item/"+material.itemData.id}>
                    <span> {material.itemData.name}</span>
                </NavLink>
            </li>;
        }

        for (let i = 0; i < todoEntries.length; i++) {
            itemRecipeList.push({
                itemData : DatabaseManager.getItemByID(todoEntries[i].id),
                materialData : todoEntries[i]
            });
        }

        const listMaterialList = [...itemRecipeList].map(recipedV2);

        // Render view
        return <tr key={index}>
            <td>
                <img className="img-pixelate" src={item.itemData.url} alt={"logo"}/>
            </td>
            <td>
                <NavLink className="item-link" to={itemURL}>
                    <span>{item.itemData.name}</span>
                </NavLink>
            </td>
            <td>
                {jobName}
            </td>

            {item.itemData.craft?.requiredEXP
                ? <td>{item.itemData.craft.requiredEXP} EXP</td>
                : <td>0 EXP</td>
            }

            {item.itemData.craft?.earnEXP
                ? <td>{item.itemData.craft.earnEXP} EXP</td>
                : <td>0 EXP</td>
            }

            <td>
                <ul className="item-recipe-list">
                    {listMaterialList}
                </ul>
            </td>
            <td>
                {item.itemData.sellable}
            </td>
        </tr>
    }

    const renderWhereItemIsUsed = () : ReactElement => {

        const usedInRecipeItems = DatabaseManager.getItemUsedInRecipeByID(ID);

        const listItems = [...usedInRecipeItems].sort(sortTypes[('default')].fn).map(renderRecipeList);

        return (
            <div className="col-lg-12">
                <div className="atk-card">

                    <div className="mb-2 pair-sell">
                        <i className="fa fa-cookie fa-sm mr-2"/> Used in recipe
                    </div>

                    <div className="divider-1x mt-3 mb-3"/>

                    <table className="table table-sm table-dark mt-4 table-striped table-hover table-items">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Skill level</th>
                            <th scope="col">EXP</th>
                            <th scope="col">Material</th>
                            <th scope="col">Sell price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listItems}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }

    const generateLinkDiv = () => {
        return '<a href=\"'+window.location.href+'">'+itemData?.name+'</a>';
    }

    const renderDescription = () => {

        if (!itemData || !itemData.description) {
            return (<></>);
        }

        return (
            <div>
                <h5>Description</h5>
                <p>
                    {itemData?.description}
                </p>
            </div>
        );
    }

    const renderUtility = () => {

        if (!itemData || !itemData.utility) {
            return (<></>);
        }

        return (
            <>
                <h5>Utility</h5>
                <p>
                    {itemData?.utility}
                </p>
            </>
        );
    }

    return (
        <>
            <main className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <div className="atk-card navbar-top">
                                <i className="fa fa-link fa-sm mr-2"/>
                                <NavLink to="/" className={({ isActive }) =>
                                    isActive ? "un-active" : ""
                                } end>
                                    <span>Home</span>
                                </NavLink>
                                »
                                <NavLink to="/items" className={({ isActive }) =>
                                    isActive ? "un-active" : ""
                                } end>
                                    <span>Items</span>
                                </NavLink>
                                »
                                <NavLink to={"/item/"+itemData?.id} className={({ isActive }) =>
                                    isActive ? "un-active" : ""
                                } end>
                                    <span>{itemData?.name}</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <div className="atk-card dashboard-cube-300">
                                <div className="mb-2 pair-sell">
                                    <i className="fa fa-chart-line fa-sm mr-2"/>Item details {(itemData) ? itemData.name : ""}
                                </div>

                                <div className="divider-1x mt-3 mb-3"/>

                                {itemData?.url
                                    ? <img className={"img-item-header img-pixelate"} src={itemData?.url} alt={"logo"}/>
                                    : ""
                                }

                                <h4>{itemData?.name}</h4>
                                <ul>

                                    {itemData?.craftEXP
                                        ? <li><b>EXP</b> : {itemData?.craftEXP}</li>
                                        : ""
                                    }

                                    {itemData?.buyable
                                        ? <li><b>Buy price</b> : {itemData?.buyable}</li>
                                        : ""
                                    }

                                    {itemData?.sellable
                                        ? <li><b>Sell price</b> : {itemData?.sellable}</li>
                                        : ""
                                    }

                                    {itemData?.energyRecover && itemData?.energyRecover > 0
                                        ? <li><b>Energy recovery</b> : {itemData?.energyRecover}</li>
                                        : ""
                                    }

                                    {itemData?.energyRecover && itemData?.energyRecover < 0
                                        ? <li><b>Energy cost</b> : {itemData?.energyRecover}</li>
                                        : ""
                                    }
                                </ul>

                                {renderCraftMaterial()}

                                <div className="divider-1x mt-3 mb-3"/>

                                {renderDescription()}
                                {renderUtility()}
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="atk-card">
                                <div className="mb-2 pair-sell">
                                    <i className="fa fa-link fa-sm mr-2"/> Item Detail
                                </div>
                                <div className="mb-2">
                                    <ul>
                                        <li>
                                            URL : {window.location.href}
                                        </li>
                                        <li>
                                            {generateLinkDiv()}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {usedInRecipe && renderWhereItemIsUsed()}
                    </div>
                </div>
            </main>
        </>
    );
}


export default ItemDetails;