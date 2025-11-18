/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah
 * Created: 09/29/25
 * Description: Component to display a single team member's basic information
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";

class TeamMemberComponent extends Component {
    render() {
        const { name, title, imagePath } = this.props;
        return (
            <div className="tile" role="group" aria-label={name}>
                <div className="thumb-wrap">
                    <img className="thumb main" src={imagePath} alt={name} />
                </div>
                <div className="body-meta">
                    <h3 className="name">{name}</h3>
                    {title ? <p className="title">{title}</p> : null}
                </div>
            </div>
        );
    }
}

export default TeamMemberComponent;
