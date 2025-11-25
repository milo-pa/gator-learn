/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez 
 * Created: 09/29/25
 * Description: Component for hosting page navigation menu links.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuComponent extends Component {
    componentDidMount() {}

    render() {
        return (
            <div className="yellow-sticky">
                {/* yub - yellow utility bar*/}
                <nav className="yub-left">
                    <Link className = "yub-link" to="/results">Browse Listings</Link>
                    <Link className = "yub-link" to="/create-tutor-listing">Create Listing</Link>
                    <Link className = "yub-link" to="/team-members">About</Link>
                    <Link className = "yub-link right-link" to="/dashboard">Dashboard</Link>
                </nav>
                <div className = "demo-line">
                    <em>SFSU Software Engineering Project CSC 648-848, Fall 2025. For Demonstration Only</em>
                </div>
            </div>
        );
    }
}

export default MenuComponent;
