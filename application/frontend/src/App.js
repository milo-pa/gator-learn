import React, { Component } from "react";
import "./App.css";
import AboutPageApp from "./component/AboutPageApp";
import TopBarComponent from "./component/TopBarComponent";
import MenuComponent from "./component/MenuComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamMemberDetail from "./component/TeamMemberDetail";
import withNavigation from "./component/WithNavigation";



const DetailWithParams = withNavigation(TeamMemberDetail);
class App extends Component {
    render() {
        return (
            <Router>
                <TopBarComponent />
                <MenuComponent />

                <main>
                    <Routes>
                        <Route path="/team-members" element={<AboutPageApp />} />
                        <Route path="/team-members/:name" element={<DetailWithParams />} />
                    </Routes>
                </main>
            
            </Router>
            
        );
    }
}

export default App;
