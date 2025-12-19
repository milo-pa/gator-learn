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
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import messageService from "../service/messageService";
import { useAuth } from "../component/AuthContext";

export default function SentMessageDashboard({ sentMessages: propSentMessages }) {
    const [sentMessages, setSentMessages] = useState(propSentMessages || []);
    const [selected, setSelected] = useState(null);
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    // Fetch messages if not passed as props
    useEffect(() => {
        if (!propSentMessages && user?.userId) {
            messageService
                .getMessagesSentByUserId(user.userId)
                .then((res) => {
                    const messages = res.data || [];
                    setSentMessages(messages);
                    // Auto-select based on id query param or first message
                    const messageId = searchParams.get("id");
                    const toSelect = messageId
                        ? messages.find((m) => m.messageId === parseInt(messageId)) || messages[0]
                        : messages[0];
                    setSelected(toSelect);
                })
                .catch((err) => {
                    console.error("Failed to fetch sent messages", err);
                    setSentMessages([]);
                });
        } else if (propSentMessages) {
            // If messages passed as props, use them
            const messageId = searchParams.get("id");
            const toSelect = messageId
                ? propSentMessages.find((m) => m.messageId === parseInt(messageId)) || propSentMessages[0]
                : propSentMessages[0];
            setSelected(toSelect);
        }
    }, [propSentMessages, user?.userId, searchParams]);

    // Update selected when id param changes or when messages load
    useEffect(() => {
        if (sentMessages.length > 0 && !selected) {
            const messageId = searchParams.get("id");
            const toSelect = messageId
                ? sentMessages.find((m) => m.messageId === parseInt(messageId)) || sentMessages[0]
                : sentMessages[0];
            setSelected(toSelect);
        } else if (sentMessages.length > 0 && selected) {
            const messageId = searchParams.get("id");
            if (messageId) {
                const found = sentMessages.find((m) => m.messageId === parseInt(messageId));
                if (found && found.messageId !== selected.messageId) {
                    setSelected(found);
                }
            }
        }
    }, [searchParams, sentMessages, selected]);

    return (
        <div className="message-dashboard">
            <h1>Sent Messages</h1>

            <div className="message-layout">
                <div className="message-list">
                    {sentMessages.length === 0 ? (
                        <div>No sent messages.</div>
                    ) : (
                        sentMessages.map((msg) => (
                            <div
                                key={msg.messageId}
                                className={`message-item ${selected?.messageId === msg.messageId ? "active" : ""}`}
                                onClick={() => setSelected(msg)}
                            >
                                <strong>{msg.listing?.account?.name || "Unknown"}</strong>
                                <div className="course">
                                    {msg.listing?.course?.courseNumber || "?"}: {msg.listing?.course?.courseName || "?"}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Column — selected message details */}
                {selected ? (
                    <div className="message-details">
                        <div className="detail-header">
                            <p>
                                <strong>To:</strong> {selected.listing?.account?.name || "Unknown"}
                            </p>
                            <p>
                                <strong>Course:</strong> {selected.listing?.course?.courseNumber || "?"}:{" "}
                                {selected.listing?.course?.courseName || "?"}
                            </p>
                            <p>
                                <strong>My Phone Number:</strong> {selected.phoneNumber || "N/A"}
                            </p>
                        </div>

                        <div className="comments-section">
                            <strong>Message:</strong>
                            <div className="comment-box">{selected.message || "No message content."}</div>
                        </div>
                    </div>
                ) : (
                    <div className="message-details">
                        <p>Select a message to view details.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
