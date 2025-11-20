/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/17/2025
 * Description: Main Dashboard page shell. Renders the sidebar, stats pills,
 *              My Listings table, and Messages panel. Uses mock data only (no backend calls).
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import DashboardSidebar from "../component/dashboard/DashboardSidebar";
import DashboardStatsRow from "../component/dashboard/DashboardStatsRow";
import MyListingsPanel from "../component/dashboard/MyListingPanel";
import DashboardMessagesPanel from "../component/dashboard/DashboardMessagesPanel";
import SentMessageDashboardPage from "./SentMessageDashboardPage.jsx";
import ReceivedMessageDashboardPage from "./ReceivedMessageDashboardPage.jsx";
import "../styles/_dashboard.scss";
import { DASHBOARD_STATS, MY_LISTINGS, MESSAGES } from "../mock/dashboardData";


export default function DashboardPage() {
    const [active, setActive] = useState("overview");

    return (
        <div className="db_page">
            <h2>Welcome back, Gator Learner!</h2>

            <div className="db-wrap">
                <DashboardSidebar active={active} onSelect={setActive} />

                <section className="db-card db-main">
                    {active === "overview" && (
                        <>
                            <DashboardStatsRow activeListings={DASHBOARD_STATS.activeListings} pendingRequests={DASHBOARD_STATS.pendingRequests} totalRequests={DASHBOARD_STATS.totalRequests} />

                            <MyListingsPanel
                                items = {MY_LISTINGS}
                            />

                            <DashboardMessagesPanel
                                messages= {MESSAGES}
                            />
                        </>
                    )}

                    {active === "sentMessages" && (<SentMessageDashboardPage />)}

                    {active === "receivedMessages" && (<ReceivedMessageDashboardPage />)}

                    {active === "myListings" && (<MyListingsPanel items={MY_LISTINGS} />)}
                </section>
            </div>
        </div>
    );
}
