import React from "react";

export default function DashboardStatsRow({
                                              activeListings = 0,
                                              pendingRequests = 0,
                                              totalRequests = 0,
                                          }) {
    return (
        <div className="db-stats-mini" role="group" aria-label="Listing stats">
            <Stat title="Active Listings" value={activeListings} />
            <Stat title="Pending Request" value={pendingRequests} />
            <Stat title="Total Request" value={totalRequests} />
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="db-stat-mini">
            <div className="db-stat__title">{title}</div>
            <div className="db-stat__value">{value}</div>
        </div>
    );
}
