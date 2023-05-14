import React, {ReactElement, ReactPropTypes} from 'react';
import './FarmsRank.scss';
import FarmRankList from "../../components/FarmRankList/FarmRankList";
import farmRank from './../../data/farmRank.json';

type QuoteProps = {
}

type QuoteState = {
    searchInput : string;
    jobsFilters : string;
}

export default class FarmsRank extends React.Component<QuoteProps, QuoteState> {

    farmRank: any = farmRank;

    /**
     * Constructor
     */
    constructor(props: ReactPropTypes) {
        super(props);

        this.state = {
            searchInput: "",
            jobsFilters: "aviculture"
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
        // Update filters
        this.setState({
            jobsFilters: code
        })
    }

    isFilter(filter : string) : boolean {
        return (this.state.jobsFilters === filter);
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

                                    <div className="mb-4 pair-sell">
                                        <i className="fa fa-database fa-sm mr-2"/> Farms ranking
                                    </div>

                                    <div className="offset-lg-12 filter-btn-list">

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("aviculture") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "aviculture")}>
                                                <span className="text-filter">Aviculture</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("cooking") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "cooking")}>
                                                <span className="text-filter">Cooking</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("farming") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "farming")}>
                                                <span className="text-filter">Farming</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("forestry") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "forestry")}>
                                                <span className="text-filter">Forestry</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("granger") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "granger")}>
                                                <span className="text-filter">Granger</span>
                                            </div>
                                        </div>

                                        <div role="button" className="btn-filter">
                                            <div className={`jobs-filter job-no-selected ${this.isFilter("woodwork") && 'job-active'}`} onClick={this.handleFilterChange.bind(this, "woodwork")}>
                                                <span className="text-filter">Woodwork</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <FarmRankList jobsFilters={this.state.jobsFilters} entries={this.farmRank} />
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
