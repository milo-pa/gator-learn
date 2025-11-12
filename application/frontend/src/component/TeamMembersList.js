/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah 
 * Created: 09/29/25
 * Description: Component to display a list of team members with links to their profiles
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import TeamMembersService from "../service/teamMembersService.js";
import TeamMemberComponent from "./TeamMemberComponent.js";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics/googleAnalytics";

class TeamMembersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            error: null,
        };
    }

    componentDidMount() {
        TeamMembersService.getAllMembers()
            .then((response) => {
                this.setState({ members: response.data.members });
            })
            .catch(() => {
                this.setState({ error: "Error fetching team members" });
            });
    }

    handleMemberClick(member) {
        trackEvent("team_member_clicked", {
            memberName: member.name,
            memberTitle: member.title,
        });
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        }

        return (
            <div className="team-members-list">
                <div className="members-display">
                    {this.state.members.map((member) => (
                        <Link key={member.name}
                              to={`/team-members/${encodeURIComponent( member.name)}`}
                              className="tile-link"
                              onClick={() => this.handleMemberClick(member)}
                        >
                            <TeamMemberComponent
                                name={member.name}
                                title={member.title}
                                imagePath={member.imagePath} />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default TeamMembersList;
