import React, { Component } from "react";

class TopBarComponent extends Component {
    render() {
        return (
            <header className="purple-titlebar">
                <div className="ptb-inner">
                    <div className="brand">SFSU Tutoring</div>
                    <div className="spacer"></div>
                    <input id="search-bar" type="search" placeholder="Search..." />
                    <img id="icon" src="favicon.ico" alt="icon" />
                </div>
            </header>
        );
    }
}

export default TopBarComponent;
