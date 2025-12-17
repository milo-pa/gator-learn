/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/18/2025
 * Description: Messages panel with tabs (All / Received / Sent). Renders a simple
 *              4-column grid (Name, Course, Status, Time)
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import messageService from "../../service/messageService";

const TABS = [
    { key: "all", label: "All" },
    { key: "received", label: "Received" },
    { key: "sent", label: "Sent" },
];

function formatDateTime(dateTimeStr) {
    const isoUtc = dateTimeStr.replace(" ", "T") + "Z";

    const date = new Date(isoUtc);

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export default function DashboardMessagesPanel({ sentMessages = [], receivedMessages = [], onDelete }) {
    const [tab, setTab] = useState("all");
    const navigate = useNavigate();

    const rows = useMemo(() => {
        const sent = (sentMessages || []).map((m) => ({
            id: m.messageId,
            name: m.listing?.account?.name || m.account?.name || "?",
            course: m.listing.course.courseNumber,
            kind: "sent",
            ago: formatDateTime(m.dateAndTime),
            raw: m,
        }));

        const received = (receivedMessages || []).map((m) => ({
            id: m.messageId,
            name: m.account?.name || m.listing?.account?.name || "?",
            course: m.listing.course.courseNumber,
            kind: "received",
            ago: formatDateTime(m.dateAndTime),
            raw: m,
        }));

        return [...received, ...sent];
    }, [sentMessages, receivedMessages]);

    const filtered = useMemo(() => {
        if (tab === "all") return rows;
        return rows.filter((r) => r.kind === tab);
    }, [rows, tab]);

    const handleDelete = async (e, messageId) => {
        e.stopPropagation();
        e.preventDefault();
        if (!window.confirm("Delete this message?")) return;
        console.log("Deleting message", messageId);
        try {
            await messageService.deleteMessage(messageId);
            if (typeof onDelete === "function") onDelete(messageId);
        } catch (err) {
            console.error("Failed to delete message", err);
            alert("Failed to delete message.");
        }
    };

    return (
        <section className="db-card db-card--messages">
            <header className="db-panel__header">
                <h3>Messages</h3>
            </header>

            <div className="db-tabs">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        className={`db-tab ${tab === t.key ? "is-active" : ""}`}
                        onClick={() => setTab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="db-table db-table--messages">
                <div className="db-table__head">
                    <div className="col col--name">Name</div>
                    <div className="col col--course">Course</div>
                    <div className="col col--kind">Status</div>
                    <div className="col col--ago">Time</div>
                </div>

                {filtered.map((row) => (
                    <div
                        key={row.id}
                        className="db-table__row db-table__row--clickable"
                        onClick={() => {
                            const path = row.kind === "received" ? "/messages/received" : "/messages/sent";
                            navigate(`${path}?id=${row.id}`);
                        }}
                    >
                        <div className="col col--name">{row.name}</div>
                        <div className="col col--course">{row.course}</div>
                        <div className="col col--kind">{row.kind === "received" ? "Received" : "Sent"}</div>
                        <div className="col col--ago">{row.ago}</div>
                        {row.kind === "sent" && (
                            <div className="col col--delete">
                                <button
                                    type="button"
                                    aria-label="Delete message"
                                    className="btn btn-icon"
                                    onClick={(e) => handleDelete(e, row.id)}
                                >
                                    <img src="images/trash.png" alt="Delete" width="16" height="16" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {filtered.length === 0 && <div className="db-table__empty">No messages in this view.</div>}
            </div>
        </section>
    );
}
