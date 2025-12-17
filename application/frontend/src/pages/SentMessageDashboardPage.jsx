import React, { useState } from "react";
import "../styles/sentmessagedashboard.scss";

export default function SentMessageDashboard({ sentMessages = [] }) {
    const [selected, setSelected] = useState(sentMessages[0]);

    return (
        <div className="message-dashboard">
            <h1>Sent Messages</h1>

            <div className="message-layout">
                <div className="message-list">
                    {sentMessages.map((msg) => (
                        <div
                            key={msg.messageId}
                            className={`message-item ${selected.messageId === msg.messageId ? "active" : ""}`}
                            onClick={() => setSelected(msg)}
                        >
                            <strong>{msg.listing.account.name}</strong>
                            <div className="course">
                                {msg.listing.course.courseNumber}: {msg.listing.course.courseName}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column — selected message details */}
                <div className="message-details">
                    <div className="detail-header">
                        <p>
                            <strong>To:</strong> {selected.listing.account.name}
                        </p>
                        <p>
                            <strong>Course:</strong> {selected.listing.course.courseNumber}:{" "}
                            {selected.listing.course.courseName}
                        </p>
                        <p>
                            <strong>My Phone Number:</strong> {selected.phoneNumber}
                        </p>
                    </div>

                    <div className="comments-section">
                        <strong>Message:</strong>
                        <div className="comment-box">{selected.message}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
