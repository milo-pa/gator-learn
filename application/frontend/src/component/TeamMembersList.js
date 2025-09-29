import React, { Component } from "react";
import TeamMembersService from "../service/TeamMembersService.js";
import TeamMemberComponent from "./TeamMemberComponent.js";
import { Link } from "react-router-dom";

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
                              className="tile-link">
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
