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
                        <Route
                            path="/"
                            element={
                                <div className="home-container">
                                    <img src="/images/HomePage/CoolGator.webp" alt="Gator mascot studying" className="home-image"
                                    />
                                    <div className="home-text">
                                        <h1>
                                            Studying for Gators <br/> by Gators!
                                        </h1>
                                        <p>
                                            Peer tutoring made easy by SF State students, for SF State
                                            students. Get the help you need from classmates who’ve
                                            been there — here at Gator Learn.
                                        </p>
                                        <p>
                                            Ready to learn? Use the search bar to start your search
                                            for tutors that teach your subject!
                                        </p>
                                    </div>
                                </div>
                            }
                        />
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
