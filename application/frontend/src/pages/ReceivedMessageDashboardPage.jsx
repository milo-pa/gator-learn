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

export default function ReceivedMessageDashboard({ receivedMessages: propReceivedMessages }) {
    const [receivedMessages, setReceivedMessages] = useState(propReceivedMessages || []);
    const [selected, setSelected] = useState(null);
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    // Fetch messages if not passed as props
    useEffect(() => {
        if (!propReceivedMessages && user?.userId) {
            messageService
                .getMessagesReceivedByUserId(user.userId)
                .then((res) => {
                    const messages = res.data || [];
                    setReceivedMessages(messages);
                    // Auto-select based on id query param or first message
                    const messageId = searchParams.get("id");
                    const toSelect = messageId
                        ? messages.find((m) => m.messageId === parseInt(messageId)) || messages[0]
                        : messages[0];
                    setSelected(toSelect);
                })
                .catch((err) => {
                    console.error("Failed to fetch received messages", err);
                    setReceivedMessages([]);
                });
        } else if (propReceivedMessages) {
            // If messages passed as props, use them
            const messageId = searchParams.get("id");
            const toSelect = messageId
                ? propReceivedMessages.find((m) => m.messageId === parseInt(messageId)) || propReceivedMessages[0]
                : propReceivedMessages[0];
            setSelected(toSelect);
        }
    }, [propReceivedMessages, user?.userId, searchParams]);

    // Update selected when id param changes or when messages load
    useEffect(() => {
        if (receivedMessages.length > 0 && !selected) {
            const messageId = searchParams.get("id");
            const toSelect = messageId
                ? receivedMessages.find((m) => m.messageId === parseInt(messageId)) || receivedMessages[0]
                : receivedMessages[0];
            setSelected(toSelect);
        } else if (receivedMessages.length > 0 && selected) {
            const messageId = searchParams.get("id");
            if (messageId) {
                const found = receivedMessages.find((m) => m.messageId === parseInt(messageId));
                if (found && found.messageId !== selected.messageId) {
                    setSelected(found);
                }
            }
        }
    }, [searchParams, receivedMessages, selected]);

    return (
        <div className="message-dashboard">
            <h1>Received Messages</h1>

            <div className="message-layout">
                <div className="message-list">
                    {receivedMessages.length === 0 ? (
                        <div>No received messages.</div>
                    ) : (
                        receivedMessages.map((msg) => (
                            <div
                                key={msg.messageId}
                                className={`message-item ${selected?.messageId === msg.messageId ? "active" : ""}`}
                                onClick={() => setSelected(msg)}
                            >
                                <strong>{msg.account?.name || "Unknown"}</strong>
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
                                <strong>From:</strong> {selected.account?.name || "Unknown"}
                            </p>
                            <p>
                                <strong>Course:</strong> {selected.listing?.course?.courseNumber || "?"}:{" "}
                                {selected.listing?.course?.courseName || "?"}
                            </p>
                            <p>
                                <strong>Their Phone Number:</strong> {selected.phoneNumber || "N/A"}
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
