import React, { Component } from "react";
import TeamMembersList from "./TeamMembersList";

class AboutPageApp extends Component {
    render() {
        return (
            <div className="about-page-app">
                <h1 id="list-header">Meet Team Five</h1>
                <TeamMembersList />
            </div>
        );
    }
}

export default AboutPageApp;
