/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: [Your Name]
 * Created: [Date]
 * Description: [Brief explanation of this file’s purpose, 1-3 lines]
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RouteChangeTracker from "./analytics/RouteChangeTracker";
import AboutPage from "./pages/AboutPage";
import TopBarComponent from "./component/TopBarComponent";
import MenuComponent from "./component/MenuComponent";
import TeamMemberDetail from "./component/about/TeamMemberDetail";
import withNavigation from "./component/WithNavigation";
import SearchResultsPage  from "./pages/SearchResultsPage";
import HomePage from "./HomePage";

const DetailWithParams = withNavigation(TeamMemberDetail);

class App extends Component {
    render() {
        return (
            <Router>
                <RouteChangeTracker />
                <header className="header-wrapper">
                    <TopBarComponent />
                    <MenuComponent />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/results" element={<SearchResultsPage />} />
                        <Route path="/team-members" element={<AboutPage />} />
                        <Route path="/team-members/:name" element={<DetailWithParams />} />
                    </Routes>
                </main>
            </Router>
        );
    }
}


export default App;
