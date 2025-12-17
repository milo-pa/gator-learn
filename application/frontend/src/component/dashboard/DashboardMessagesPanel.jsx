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

export default function DashboardMessagesPanel({ sentMessages = [], receivedMessages = [] }) {
    const [tab, setTab] = useState("all");

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

    return (
        <section className="db-card">
            <div className="db-card__title">Messages</div>

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

            <div className="db-table">
                <div className="db-table__head">
                    <div className="col col--name">Name</div>
                    <div className="col col--course">Course</div>
                    <div className="col col--kind">Status</div>
                    <div className="col col--ago">Time</div>
                </div>

                {filtered.map((row) => (
                    <div key={row.id} className="db-table__row">
                        <div className="col col--name">{row.name}</div>
                        <div className="col col--course">{row.course}</div>
                        <div className="col col--kind">{row.kind === "received" ? "Received" : "Sent"}</div>
                        <div className="col col--ago">{row.ago}</div>
                    </div>
                ))}

                {filtered.length === 0 && <div className="db-table__empty">No messages in this view.</div>}
            </div>
        </section>
    );
}
