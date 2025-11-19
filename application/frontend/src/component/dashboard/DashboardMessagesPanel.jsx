import React, { useMemo, useState } from "react";

const TABS = [
    { key: "all", label: "All" },
    { key: "received", label: "Received" },
    { key: "sent", label: "Sent" },
];

// Example message shape:
// { id: 1, name: "Sarah", course: "CSC 220", kind: "received" | "sent", ago: "2 hr" }
export default function DashboardMessagesPanel({ messages = [] }) {
    const [tab, setTab] = useState("all");

    const filtered = useMemo(() => {
        if (tab === "all") return messages;
        return messages.filter(m => m.kind === tab);
    }, [messages, tab]);

    return (
        <section className="db-card">
            <div className="db-card__title">Messages</div>

            <div className="db-tabs">
                {TABS.map(t => (
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

                {filtered.map(row => (
                    <div key={row.id} className="db-table__row">
                        <div className="col col--name">{row.name}</div>
                        <div className="col col--course">{row.course}</div>
                        <div className="col col--kind">{row.kind === "received" ? "Received" : "Sent"}</div>
                        <div className="col col--ago">{row.ago}</div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="db-table__empty">No messages in this view.</div>
                )}
            </div>
        </section>
    );
}
