import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuComponent extends Component {
    componentDidMount() {}

    render() {
        return (
            <div className="yellow-sticky">
                {/* yub - yellow utility bar*/}
                <nav className="yub-left">
                    <Link className="yub-link" to="/">Home</Link>
                    <Link className ="yub-link" to="/team-members">About</Link>
                    <Link className = "yub-link" to="/browse-listings">Browse listings</Link>
                    <Link className = "yub-link" to="/create-tutor-listing">Create Tutor listing</Link>
                    <Link className = "yub-link" to="/dashboard">Dashboard</Link>
                </nav>
                <div className = "demo-line">
                    <em>SFSU Software Engineering Project CSC 648-848, Fall 2025. For Demonstration Only</em>

                </div>
            </div>
        );
    }
}

export default MenuComponent;
