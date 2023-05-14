import {useEffect, useState} from "react";
import {IItem} from "../../interfaces/itemInterface";
import {DatabaseManager} from "../../services/DatabaseManager";
import './ItemList.scss';
import {NavLink} from "react-router-dom";

type QuoteProps = {
    entries: IItem[];
    nameFilter: string;
    jobsFilters: string[];

}

const sortTypes = {
    key: {
        fn: (a: any, b: any) => a.key - b.key
    },
    down: {
        fn: (a: any, b: any) => b.net_worth - a.net_worth
    },
    default: {
        fn: (a: any, b: any) => a.key - b.key
    }
};

const ItemsList = (props:QuoteProps) => {

    const [items, setItems] = useState<IItem[]>([]);

    const createTasks = (item: IItem, index: number) => {

        const jobItem = DatabaseManager.getJobByID(item.job);
        const jobName = (jobItem) ? jobItem.name : 'No job';
        const jobImg = (jobItem) ? jobItem.imgUrl : false;

        const itemURL = "/item/"+item.id;

        return <tr key={index}>

            <td>
                <img src={item.url} alt={"logo"}/>
            </td>
            <td>
                <NavLink className="item-link" to={itemURL}>
                    <span>{item.name}</span>
                </NavLink>
            </td>
            <td>
                {item.buyable}
            </td>
            <td>
                {item.sellable}
            </td>
            <td>
                {jobImg
                    ? <img className={"img-job"} src={jobImg} alt={"logo"}/>
                    : ""
                }
                {jobName}
            </td>
        </tr>
    }

    // Init items
    useEffect(() => {
        setItems(props.entries);
    }, []);


    const buildTemplate = () => {

        const filterName = props.nameFilter;

        let out = items.filter( item => {
            if (!item.name) {
                return null
            }
            return item.name.toLowerCase().includes(filterName.toLowerCase())
        })

        if (props.jobsFilters.length > 0) {
            out = out.filter( item => {
                if (!item.job) {
                    return null
                }
                return props.jobsFilters.includes(item.job)
            })
        }


        const listItems = [...out].sort(sortTypes[('default')].fn).map(createTasks);

        return (
            (listItems.length < 1)
                    ? <h4 className="no-item-found mt-4">No item found</h4>
                    :

            <table className="table table-sm table-dark mt-4 table-striped table-hover table-items">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Buyable</th>
                    <th scope="col">Sellable</th>
                    <th scope="col">Job</th>
                </tr>
                </thead>
                <tbody>
                {listItems}
                </tbody>
                <tfoot>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Buyable</th>
                    <th scope="col">Sellable</th>
                    <th scope="col">Job</th>
                </tr>
                </tfoot>
            </table>
        )
    }

    return (
        <div>
            {buildTemplate()}
        </div>
    );
}

export default ItemsList;