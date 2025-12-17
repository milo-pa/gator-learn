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

export default function ReceivedMessageDashboard({ receivedMessages = [] }) {
    const [selected, setSelected] = useState(receivedMessages[0]);

    return (
        <div className="message-dashboard">
            <h1>Received Messages</h1>

            <div className="message-layout">
                <div className="message-list">
                    {receivedMessages.map((msg) => (
                        <div
                            key={msg.messageId}
                            className={`message-item ${selected.messageId === msg.messageId ? "active" : ""}`}
                            onClick={() => setSelected(msg)}
                        >
                            <strong>{msg.account.name}</strong>
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
                            <strong>From:</strong> {selected.account.name}
                        </p>
                        <p>
                            <strong>Course:</strong> {selected.listing.course.courseNumber}:{" "}
                            {selected.listing.course.courseName}
                        </p>
                        <p>
                            <strong>Their Phone Number:</strong> {selected.phoneNumber}
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
