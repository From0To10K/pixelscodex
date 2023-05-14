import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from "jquery";
import './Sidebar.scss';

type QuoteProps = {
}

type QuoteState = {
}

class Sidebar extends React.Component<QuoteProps, QuoteState> {

    componentDidMount() {
        $('#close-sidebar').click(() => {
            $('.page-wrapper').removeClass('toggled');
        });
        $('#show-sidebar').click(() => {
            $('.page-wrapper').addClass('toggled');
        });
    }

    /**
     * Rendering
     */
    render() {
        return (
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <a href="#">Pixels Codex - V0.0.5</a>
                        <div id="close-sidebar">
                            <i className="fas fa-times"/>
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <ul>
                            <li className="header-menu">
                                <span>General</span>
                            </li>

                            <li>
                                <NavLink to="/" className={({ isActive }) =>
                                    isActive ? "active" : ""
                                } end>
                                    <i className="fa fa-home" />
                                    <span>Home</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/items" className={({ isActive }) =>
                                    isActive ? "active" : ""
                                } end>
                                    <i className="fa fa-shopping-bag" />
                                    <span>Items</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/farmsRank" className={({ isActive }) =>
                                    isActive ? "active" : ""
                                } end>
                                    <i className="fa fa-ranking-star" />
                                    <span>Farms ranking</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/tools" className={({ isActive }) =>
                                    isActive ? "active" : ""
                                } end>
                                    <i className="fa fa-wrench" />
                                    <span>Tools</span>
                                    <span id="alien-badge" className="badge rounded-pill text-dark bg-warning">Soon</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/quests" className={({ isActive }) =>
                                    isActive ? "active" : ""
                                } end>
                                    <i className="fa fa-book-open" />
                                    <span>Quests</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <a href="https://twitter.com/From0To10k">
                        Build with <i className="build-love fa fa-heart"/> by From0To10K
                    </a>
                </div>
            </nav>
        );
    }
}


export default Sidebar