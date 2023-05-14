import React, {ReactElement, ReactPropTypes} from 'react';
import './Tools.scss';

type QuoteProps = {

}

type QuoteState = {

}

export default class Tools extends React.Component<QuoteProps, QuoteState> {
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
                                        <i className="fa fa-chart-line fa-sm mr-2"/> Tools
                                    </div>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <h4>Soon</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
