import React, {ReactElement, ReactPropTypes} from 'react';
import './Items.scss';

import {DatabaseManager} from "../../services/DatabaseManager";
import ItemsList from "../../components/ItemsList/ItemsList";

type QuoteProps = {

}

type QuoteState = {
    searchInput : string;
    jobsFilters : string[];
}

export default class Items extends React.Component<QuoteProps, QuoteState> {

    /**
     * Constructor
     */
    constructor(props: ReactPropTypes) {
        super(props);

        this.state = {
            searchInput: "",
            jobsFilters: []
        }

        this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
    }

    /**
     * Handling when user change backup land ID
     */
    handleInputSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({searchInput: event.target.value});
    }

    /**
     * Handling when user change backup land ID
     */
    handleFilterChange(code:string): void {

        // Check if item is in
        let foundItem = false;
        const filters = this.state.jobsFilters;


        for(let i = 0; i < filters.length; i++) {
            if (filters[i] === code) {
                filters.splice(i, 1);
                foundItem = true;
                break;
            }
        }

        if (!foundItem) {
            filters.push(code);
        }

        // Update filters
        this.setState({
            jobsFilters: filters
        })
    }

    isFilter(filter : string) : boolean {
        return (this.state.jobsFilters.includes(filter));
    }

    /**
     * Rendering template
     */
    render(): ReactElement {
        return (
            <div>
                <main className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg">
                                <div className="atk-card">
                                    <div className="mb-2 pair-sell">
                                        <i className="fa fa-database fa-sm mr-2"/> Items ({DatabaseManager.Items.length})
                                    </div>

                                    <div className="offset-lg-8  col-lg-4 col-md-6 offset-md-6">
                                        <div className="form-group from-group-commission">
                                            <div className="input-group">
                                                <input id="autoPayoutDelay" type="text"
                                                       className="form-control cc-input-text"
                                                       value={this.state.searchInput}
                                                       onChange={this.handleInputSearchChange}
                                                       aria-label="Payout delay"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Search</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5>Job Filters</h5>
                                    <div className="offset-lg-12 filter-btn-list">

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-ceramicist ${this.isFilter("ceramicist") && 'job-ceramicist-active'}`} onClick={this.handleFilterChange.bind(this, "ceramicist")}>
                                                <span className="text-filter">Ceramicist</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-cooking ${this.isFilter("cooking") && 'job-cooking-active'}`} onClick={this.handleFilterChange.bind(this, "cooking")}>
                                                <span className="text-filter">Cooking</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-farming ${this.isFilter("farming") && 'job-farming-active'}`} onClick={this.handleFilterChange.bind(this, "farming")}>
                                                <span className="text-filter">Farming</span>
                                            </div>
                                        </div>


                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-granger ${this.isFilter("granger")  && 'job-granger-active'}`} onClick={this.handleFilterChange.bind(this, "granger")}>
                                                <span className="text-filter">Granger</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-woorkorking ${this.isFilter("woodwork")  && 'job-woorkorking-active'}`} onClick={this.handleFilterChange.bind(this, "woodwork")}>
                                                <span className="text-filter">Woodwork</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <ItemsList nameFilter={this.state.searchInput} jobsFilters={this.state.jobsFilters} entries={DatabaseManager.Items} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
