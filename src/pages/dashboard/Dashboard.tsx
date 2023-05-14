import React, {ReactElement} from 'react';
import './Dashboard.scss';

type QuoteProps = {
}

type QuoteState = {
}

export default class Dashboard extends React.Component<QuoteProps, QuoteState> {
    render(): ReactElement {
        return (
            <div>
                <main className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="atk-card dashboard-cube-300">
                                    <div className="mb-2 pair-sell">
                                        <i className="fa fa-chart-line fa-sm mr-2"/> News
                                    </div>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <h4>14/05/2023 - v0.0.5</h4>
                                    <ul>
                                        <li>Update items</li>
                                        <li>Update libs</li>
                                    </ul>

                                    <h4>15/12/2022 - v0.0.4</h4>
                                    <ul>
                                        <li>Update items</li>
                                    </ul>

                                    <h4>09/12/2022 - v0.0.3</h4>
                                    <ul>
                                        <li>Add last items</li>
                                        <li>Add jobs filters</li>
                                        <li>Override some items with wrong data</li>
                                        <li>Add farms ranking</li>
                                    </ul>

                                    <h4>06/12/2022 - v0.0.1</h4>
                                    <ul>
                                        <li>Start dev of Pixels Codex</li>
                                        <li>Build design of app & navigation</li>
                                        <li>Add 370 items into BDD</li>
                                        <li>Add item navigation & recipe for each</li>
                                        <li>Add panel Used in Recipe to see where is used</li>
                                        <li>Add link navigation side item & app</li>
                                        <li>Add navbar on item navigation</li>
                                        <li>Add search input to find items more faster</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4">
                                <div className="atk-card">
                                    <div className="mb-2 pair-sell">
                                        <i className="fa fa-exchange-alt fa-sm mr-2"/> General
                                    </div>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <div className="mb-2 pair-sell">
                                         Best farms
                                    </div>

                                    <ul>
                                        <li>The Cryptomasks : #1972</li>
                                        <li>Kingdaw farm #1552</li>
                                        <li>Jack Land : #1597</li>
                                        <li><a href={'https://twitter.com/From0To10k'}
                                               rel="noopener noreferrer" target="_blank">Your farm here ? Contact me
                                        </a></li>
                                    </ul>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <div className="mb-2 pair-sell">Official links</div>

                                    <div className="mb-2">
                                        <div className="text-center mt-2">
                                            <div>
                                                <a className="btn btn-primary btn-block" href={'https://discord.gg/CWNJbNgkCK'}
                                                   rel="noopener noreferrer" target="_blank">Pixels Codex Discord
                                                </a>
                                                <a className="btn btn-primary btn-block" href={'https://www.pixels.xyz/'}
                                                   rel="noopener noreferrer" target="_blank">Official Pixels Website
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="divider-1x mt-3 mb-3"/>

                                    <div className="mb-2 pair-sell"> <i className="build-love fa fa-heart"/> Make donation</div>
                                    You want to help me do more ? You can contribute here on any blockchain
                                    <a className="link-donation" href="https://polygonscan.com/address/0x07b78c29f645b92004cd44b4e3baf9adf0af1927" rel="noopener noreferrer" target="_blank">
                                        <b>0x07b78c29f645b92004cd44b4e3baf9adf0af1927</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
