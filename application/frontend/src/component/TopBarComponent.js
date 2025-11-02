import React, { Component } from "react";

class TopBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lightMode: false,
        };
    }


    toggleTheme = () => {
        this.setState((prevState) => ({
            lightMode: !prevState.lightMode,
        }), () => {
            document.body.classList.toggle('light-mode', this.state.lightMode);
        });
    }
    render() {
        const { lightMode} = this.state;
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
                     <div className = "theme-toggle"> 
                        <label className="switch">
                            <input type="checkbox" onChange={this.toggleTheme} checked={lightMode} />
                            <span className="slider">
                                {lightMode ? "Light Mode" : "Dark Mode" }
                            </span>
                        </label>
                    </div>
                    <input id="search-bar" type="search" placeholder="Search..." className="search-input" />
                    <button id="signup-button" className="signup-button">Sign Up</button>
                </div>
            </header>
        );
    }
}

export default TopBarComponent;
