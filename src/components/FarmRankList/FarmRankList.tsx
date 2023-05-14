import React, {ReactElement} from "react";
import './FarmRankList.scss';
import {IFarmRankDataInterface, IFarmRankInterface} from "../../interfaces/IFarmInterface";

type QuoteProps = {
    entries: IFarmRankDataInterface;
    jobsFilters: string;
}

type QuoteState = {
}

export default class FarmRankList extends React.Component<QuoteProps, QuoteState> {

    /**
     * Constructor
     */
    constructor(props: QuoteProps) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item: IFarmRankInterface, index: number): ReactElement {
        return <tr key={index}>
            <td>
                {index+1}
            </td>
            <td>
                <span>{item.nft.tokenId}</span>
            </td>
            <td className="name-column">
                <span>{item.name}</span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.aviculture && item.levels.aviculture.level
                        ? "lvl " + item.levels.aviculture.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.aviculture && item.levels.aviculture.totalExp
                        ? " - "+item.levels.aviculture.totalExp+" xp"
                        : " - "+0 + " - xp"
                    }
                </span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.cooking && item.levels.cooking.level
                        ? "lvl " + item.levels.cooking.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.cooking && item.levels.cooking.totalExp
                        ? " - "+item.levels.cooking.totalExp+" xp"
                        : " - "+0 + " - xp"
                    }
                </span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.farming && item.levels.farming.level
                        ? "lvl " + item.levels.farming.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.farming && item.levels.farming.totalExp
                        ? " - "+item.levels.farming.totalExp+" xp"
                        : " - "+0 + " - xp"
                    }
                </span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.forestry && item.levels.forestry
                        ? "lvl " + item.levels.forestry.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.forestry && item.levels.forestry.totalExp
                        ? " - "+item.levels.forestry.totalExp+" xp"
                        : " - "+0 + " - xp"
                    }
                </span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.granger && item.levels.granger.level
                        ? "lvl " + item.levels.granger.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.granger && item.levels.granger.totalExp
                        ? " - "+item.levels.granger.totalExp+" xp"
                        : " - "+0 + " - xp"
                    }
                </span>
            </td>
            <td>
                <span>
                    {item.levels && item.levels.woodwork && item.levels.woodwork.level
                        ? "lvl " + item.levels.woodwork.level
                        : "lvl " + 0
                    }

                    {item.levels && item.levels.woodwork && item.levels.woodwork.totalExp
                        ? " - "+item.levels.woodwork.totalExp+" xp"
                        : " - "+ 0 + " - xp"
                    }
                </span>
            </td>
        </tr>
    }

    render() {
        const jobsFilters = this.props.jobsFilters;
        const n2: any = this.props.entries;

        const n3 = n2[jobsFilters];

        function sortByExp(a: any, b: any) {
            return b.levels[jobsFilters].totalExp - a.levels[jobsFilters].totalExp;
        }

        const listItems = [...n3].sort(sortByExp).map(this.createTasks); /*todoEntries.map(this.createTasks);*/

        const templateTable = (
            <table className="table table-sm table-dark mt-4 table-striped table-hover table-items">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Aviculture</th>
                    <th scope="col">Cooking</th>
                    <th scope="col">Farming</th>
                    <th scope="col">Forestry</th>
                    <th scope="col">Granger</th>
                    <th scope="col">Woodwork</th>
                </tr>
                </thead>
                <tbody>
                {listItems}
                </tbody>
                <tfoot>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Aviculture</th>
                    <th scope="col">Cooking</th>
                    <th scope="col">Farming</th>
                    <th scope="col">Forestry</th>
                    <th scope="col">Granger</th>
                    <th scope="col">Woodwork</th>
                </tr>
                </tfoot>
            </table>
        )

        return (
            <div>
                {listItems.length < 1
                    ? <h4 className="no-item-found">No item found</h4>
                    : templateTable
                }
            </div>
        );
    }
}