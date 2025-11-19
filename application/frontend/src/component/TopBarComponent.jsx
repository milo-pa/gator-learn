/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 09/29/25
 * Description: Top bar component including branding, search, and user actions
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {Component} from "react";
import SearchBar from "./SearchBarComponent";

import "../TopBarComponent.css";
import { Link } from "react-router-dom";

class TopBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // default is now light mode
            theme: "light",
            userSetPreference: false
        };
        this.mql = null;
    }

    // Need to move these dark theme functions to their own class
    applyTheme = (theme) => {
        document.body.classList.toggle("dark-mode", theme === "dark");
    };

    componentDidMount() {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            this.setState({ theme: saved , userSetPreference: true}, () => this.applyTheme(saved));
            return;
        }

        if (window.matchMedia) {
            this.mql = window.matchMedia("(prefers-color-scheme: dark)");
            const systemPrefersDark = this.mql.matches;
            const initialTheme = systemPrefersDark ? "dark" : "light";
            this.setState({ theme: initialTheme, userSetPreference: false}, () => {
                this.applyTheme(initialTheme);
            });
            this.mql.addEventListener("change", this.handleSystemThemeChange);
        } else 
        {
            this.applyTheme("light");
        }
    }
    
    componentWillUnmount() {
        if (this.mql && this.mql.removeEventListener) {
            this.mql.removeEventListener("change", this.handleSystemThemeChange);
        }
    }

    handleSystemThemeChange = (e) => {
        if (this.state.userSetPreference) {
            return;
        }
        const newTheme = e.matches ? "dark" : "light";
        this.setState({ theme: newTheme }, () => this.applyTheme(newTheme));
    };

    toggleTheme = () => {
        this.setState(
            (prevState) => ({
                theme: prevState.theme === "light" ? "dark" : "light"
            }), () => {
                const {theme} = this.state;
                this.applyTheme(theme);
                localStorage.setItem("theme", theme);
            });
    };

    render() {
        return (
            <header className="purple-titlebar">
                <div className="ptb-inner">
                    <div className="brand-section">
                        <a href="/" className="brand-link">
                            <img id="logo" src="favicon.ico" alt="logo"/>
                            <span className="brand">Gator Learn</span>
                            <span className="brand-team">by Team 5</span>
                        </a>
                    </div>
                    <div className="spacer"></div>
                    <SearchBar/>

                    {/* Will need to add function later to change login to log out when user signed in */}
                    <button id="login-button" className="login-button">
                        <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                            Login
                        </Link>
                    </button>
                    <img src="/images/default-profile.png" alt="Profile" className="profile-icon"/>
                </div>
            </header>
        );
    }
}

export default TopBarComponent;
