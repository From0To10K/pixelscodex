import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

/**
 * Pages
 */

import Dashboard from "./pages/dashboard/Dashboard";
import Items from "./pages/items/Items";
import Quests from "./pages/quests/Quests";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import {DatabaseManager} from "./services/DatabaseManager";
import Tools from "./pages/tools/Tools";
import FarmsRank from "./pages/farmsRank/FarmsRank";

import Sidebar from "./components/Sidebar/Sidebar";

function App() {

    // Start Parser
    DatabaseManager.generateParsing();

    return (
        <Router>
            <Sidebar/>
            <Routes>
                <Route exact strict path="/" element={<Dashboard />} />
                <Route exact strict path="/items" element={<Items />} />
                <Route exact strict path="/quests" element={<Quests />} />
                <Route exact strict path="/farmsRank" element={<FarmsRank />} />
                <Route exact strict path="/tools" element={<Tools />} />
                <Route path='/item/:itemID' element={<ItemDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
