/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/17/2025
 * Description: Compact stats bar showing key counts (Active Listings, Pending Requests,
 *              Total Requests) as pill cards.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

export default function DashboardStatsRow({ activeListings = 0, pendingRequests = 0, totalRequests = 0 }) {
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
