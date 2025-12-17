/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Enrique Liganor
 * Created: 11/08/25
 * Description:
 * Home Page functional component routed to default.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import "../styles/messagedashboard.scss";

const sampleMessages = [
    {
        id: 1,
        sender: "Sarah",
        course: "CSC 648 / Software Engineering",
        contact: "(123) 456-7890",
        comments: "I am having trouble on my milestone 2, do you think you can explain some concepts needed?"
    },
    {
        id: 2,
        sender: "Michael Lee",
        course: "CSC 210 / Intro to CS",
        contact: "(555) 555-5555",
        comments: "Can we schedule another tutoring session?"
    },
    {
        id: 3,
        sender: "Enrique Liganor",
        course: "CSC 648 / Software Engineering",
        contact: "(234) 272-8328",
        comments: "I am in need of assistance in terms of learning ReactJS for my 648 class. Can you help me?"
    },
    {
        id: 4,
        sender: "Dragutin Petkovic",
        course: "CSC 648 / Software Engineering",
        contact: "(999) 234-9823",
        comments: "This Milestone makes me go bananas."
    },
];

export default function ReceivedMessageDashboard() {
    const [selected, setSelected] = useState(sampleMessages[0]);

    return (
        <div className="message-dashboard">
            <h1>Received Messages</h1>

            <div className="message-layout">
                <div className="message-list">
                    {sampleMessages.map(msg => (
                        <div
                            key={msg.id}
                            className={`message-item ${selected.id === msg.id ? "active" : ""}`}
                            onClick={() => setSelected(msg)}
                        >
                            <strong>{msg.sender}</strong>
                            <div className="course">{msg.course}</div>
                        </div>
                    ))}
                </div>

                {/* Right Column — selected message details */}
                <div className="message-details">
                    <div className="detail-header">
                        <p><strong>From:</strong> {selected.sender}</p>
                        <p><strong>Sub:</strong> {selected.course}</p>
                        <p><strong>Contact Information:</strong> {selected.contact}</p>
                    </div>

                    <div className="comments-section">
                        <strong>Comments:</strong>
                        <div className="comment-box">
                            {selected.comments}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
