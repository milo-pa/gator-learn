import React, { Component} from "react";
import SearchBar from "./SearchBarComponent";

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
                        <a href= "/" className="brand-link">
                            <img id="logo" src="favicon.ico" alt="logo" />
                            <span className="brand">Gator Learn</span>
                        </a>
                    </div>
                    <div className="spacer"></div>
                    <SearchBar />
                    
                    {/* Will need to add function later to change login to log out when user signed in */}
                    <button id="login-button" className="login-button">Login</button>
                    <div className="profile-placeholder"></div>
                </div>
            </header>
        );
    }
}

export default TopBarComponent;
