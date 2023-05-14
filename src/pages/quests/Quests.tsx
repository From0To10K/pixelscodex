import React, {ReactElement, ReactPropTypes} from 'react';
import './Quests.scss';

type QuoteProps = {

}

type QuoteState = {

}

export default class Dashboard extends React.Component<QuoteProps, QuoteState> {
    listRef: React.RefObject<never>;
    state: QuoteState;

    /**
     * Constructor
     *
     * @param props         React prop
     */
    constructor(props: ReactPropTypes) {
        super(props);
        this.listRef = React.createRef();

        // Default states values
        this.state = {

        };
    }

    /**
     * Render view
     */
    render() : ReactElement {
        return (
            <div>
                <main className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="atk-card dashboard-cube-300">
                                    <div className="mb-2 pair-sell">
                                        <i className="fa fa-chart-line fa-sm mr-2"/> Quests
                                    </div>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <h4>Candies</h4>
                                    <p>
                                        <a href="/assets/img/PixelsCandies.png" target="_blank">
                                            <img width="100%" src="/assets/img/PixelsCandies.png" alt="Pixels candies map"/>
                                        </a>
                                    </p>
                                    <p>Many thanks <b>Lalox</b> for this map</p>

                                    <h4>Flour Powder</h4>
                                    <ul>
                                        <li>Soon</li>
                                    </ul>

                                    <h4>Barney`s Farm Tutorial Powder</h4>
                                    <ul>
                                        <li>Soon</li>
                                    </ul>

                                    <h4>Ranger`s Dale</h4>
                                    <ul>
                                        <li>Soon</li>
                                    </ul>

                                    <h4>The bucks Galore</h4>
                                    <ul>
                                        <li>Soon</li>
                                    </ul>

                                    <h4>Axeing for help</h4>
                                    <ul>
                                        <li>Soon</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
