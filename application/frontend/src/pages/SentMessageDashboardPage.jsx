import React, { useState } from "react";
import "../styles/sentmessagedashboard.scss";


const sampleMessages = [
    {
        id: 1,
        sender: "Sarah",
        course: "CSC 648 / Software Engineering",
        contact: "(123) 456-7890",
        comments: "I am more than happy to help you in explaining some concepts about Milestone 2. When is a good time?"
    },
    {
        id: 2,
        sender: "Michael Lee",
        course: "CSC 210 / Intro to CS",
        contact: "(555) 555-5555",
        comments: "Sure! When is a good day for you to meet?"
    },
    {
        id: 3,
        sender: "Enrique Liganor",
        course: "CSC 648 / Software Engineering",
        contact: "(234) 272-8328",
        comments: "We've been over this, Enrique. We can schedule another meeting to go over the basics again." +
            " When is a good meeting time with you?"
    },
    {
        id: 4,
        sender: "Dragutin Petkovic",
        course: "CSC 648 / Software Engineering",
        contact: "(999) 234-9823",
        comments: "Me too Professor Petkovic. Me too."
    },
];

export default function MessageDashboard() {
    const [selected, setSelected] = useState(sampleMessages[0]);

    return (
        <div className="message-dashboard">
            <h1>Sent Messages</h1>

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
                        <p><strong>To:</strong> {selected.sender}</p>
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
