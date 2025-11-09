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
