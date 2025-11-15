/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 09/29/25
 * Description: Component to display detailed information about a single team member
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";

import TeamMembersService from "../service/teamMemberServices";
import { Link } from "react-router-dom";

class TeamMemberDetail extends Component {
    state = {
        member: null,
        error: null,
        loading: true,
    };

    componentDidMount() {
        const name = decodeURIComponent(this.props.params.name);
        TeamMembersService.getMemberByName(name)
            .then((response) => {
                this.setState({ member: response.data, loading: false });
            })
            .catch(() => {
                this.setState({ error: "Error fetching team member" });
            });
    }

    render() {
        const { member, error, loading } = this.state;
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

        return (
            <main className="solo-page">
                <p className="back-link">
                    <Link to="/team-members"> &lt; Back to Team</Link>
                </p>
                <section className="solo-card">
                    <img className="solo-img" src={member.imagePath} alt={member.name} />
                    <div className="solo-body">
                        <h2 className="solo-name">{member.name}</h2>
                        {member.title && <p className="solo-title">{member.title}</p>}
                        {member.bio && <p className="solo-bio">{member.bio}</p>}
                        {Array.isArray(member.links) && member.links.length > 0 && (
                            <p className="solo-links">
                                {member.links.map((lnk) => (
                                    <a
                                        key={lnk.href || lnk.label}
                                        href={lnk.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {lnk.label}
                                    </a>
                                ))}
                            </p>
                        )}
                    </div>
                </section>
            </main>
        );
    }
}

export default TeamMemberDetail;
