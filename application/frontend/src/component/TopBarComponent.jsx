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
import React, { Component } from "react";
import SearchBar from "./SearchBarComponent";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

class TopBarComponent extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      // default is now light mode
      theme: "light",
      userSetPreference: false,
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
      this.setState({ theme: saved, userSetPreference: true }, () => this.applyTheme(saved));
      return;
    }

    if (window.matchMedia) {
      this.mql = window.matchMedia("(prefers-color-scheme: dark)");
      const systemPrefersDark = this.mql.matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      this.setState({ theme: initialTheme, userSetPreference: false }, () => {
        this.applyTheme(initialTheme);
      });
      this.mql.addEventListener("change", this.handleSystemThemeChange);
    } else {
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
        theme: prevState.theme === "light" ? "dark" : "light",
      }),
      () => {
        const { theme } = this.state;
        this.applyTheme(theme);
        localStorage.setItem("theme", theme);
      }
    );
  };

  render() {
    return (
      <header className="purple-titlebar">
        <em className="demo-line">SFSU Software Engineering Project CSC 648-848, Fall 2025. For Demonstration Only</em>
        <div className="ptb-inner">
          <div className="brand-section">
            <a href="/" className="brand-link">
              <img id="logo" src="/favicon.ico" alt="logo" />
              <span className="brand">Gator Learn</span>
              <span className="brand-team">by Team 5</span>
            </a>
          </div>
          <div className="spacer" />
          <SearchBar />
          <div className="spacer" />

          {/* Login / Logout and profile icon behavior based on auth status */}
          {(() => {
            const { isLoggedIn, logout } = this.context || {};
            if (isLoggedIn) {
              return (
                <>
                <div className="action-wrapper">
                  <button
                    id="logout-button"
                    className="btn btn-primary login-button"
                    onClick={() => {
                      logout().finally(() => window.location.assign("/"));
                    }}
                  >
                    Logout
                  </button>
                  <Link to="/user-profile">
                    <img src="/images/default-profile.png" alt="Profile" className="profile-icon" />
                  </Link>

                </div>
                  
                </>
              );
            }

            return (
              <>
                <Link id="login-button" to="/login" className="btn btn-primary login-button">
                  Login
                </Link>
              </>
            );
          })()}
        </div>
      </header>
    );
  }
}

export default TopBarComponent;
