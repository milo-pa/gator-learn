import React, { Component } from "react";

import TeamMembersService from "../service/TeamMembersService";
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
