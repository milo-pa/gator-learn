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

import TopBarComponent from "./component/TopBarComponent";
import MenuComponent from "./component/MenuComponent";
import TeamMemberDetail from "./component/about/TeamMemberDetail";
import withNavigation from "./component/WithNavigation";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TutorListingPage from "./pages/TutorListingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";

import ReceivedMessageDashboardPage from "./pages/ReceivedMessageDashboardPage.jsx";
import SentMessageDashboardPage from "./pages/SentMessageDashboardPage.jsx";

const DetailWithParams = withNavigation(TeamMemberDetail);
const ListingWithParams = withNavigation(TutorListingPage);

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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/team-members/:name" element={<DetailWithParams />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/listing/:id" element={<ListingWithParams />} />
                        <Route path="/messages/received" element={<ReceivedMessageDashboardPage />} />
                        <Route path="/messages/sent" element={<SentMessageDashboardPage />} />
                    </Routes>
                </main>
            </Router>
        );
    }
}


export default App;
