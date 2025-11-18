/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha or Jonah 
 * Created: 09/29/25
 * Description: 
 * Page component for the About Page, displaying information about Team 5 members.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import TeamMembersList from "../component/TeamMembersList";

class AboutPageApp extends Component {
    render() {
        return (
            <div className="about-page-app">
                <h1 id="list-header">Meet Team 5</h1>
                <TeamMembersList />
            </div>
        );
    }
}

export default AboutPageApp;
