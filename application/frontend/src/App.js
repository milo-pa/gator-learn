import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RouteChangeTracker from "./analytics/RouteChangeTracker";
import AboutPageApp from "./component/AboutPageApp";
import TopBarComponent from "./component/TopBarComponent";
import MenuComponent from "./component/MenuComponent";
import TeamMemberDetail from "./component/TeamMemberDetail";
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
                        <Route path="/team-members" element={<AboutPageApp />} />
                        <Route path="/team-members/:name" element={<DetailWithParams />} />
                    </Routes>
                </main>
            </Router>
        );
    }
}


export default App;
