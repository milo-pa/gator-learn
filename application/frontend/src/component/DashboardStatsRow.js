import React from "react";

export default function DashboardStatsRow({
    activeListings = 2,
    pendingRequests = 1,
    totalRequests = 9,
                                          }){
    const items = [
        { label: "Acitve Listings", value: activeListings},
        { label: "Pending Requests", value: pendingRequests},
        { label: "Total Requests", value: totalRequests},
    ];

    return (
        <div className="db-stats">
            {items.map((it) => (
                <div key={it.label} className="db-stats__card">
                    <div className="db-stats__value">{it.value}</div>
                    <div className="db-stats__label">{it.label}</div>
                </div>
            ))}
        </div>
    );
}