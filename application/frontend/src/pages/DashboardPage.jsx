import React, { useState } from "react";
import DashboardSidebar from "../component/dashboard/DashboardSidebar";
import DashboardStatsRow from "../component/dashboard/DashboardStatsRow";
import MyListingsPanel from "../component/dashboard/MyListingPanel";
import DashboardMessagesPanel from "../component/dashboard/DashboardMessagesPanel";
import "../styles/dashboard.scss";
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

                    {active === "messages" && (<DashboardMessagesPanel messages={MESSAGES} />)}

                    {active === "myListings" && (<MyListingsPanel items={MY_LISTINGS} />)}
                </section>
            </div>
        </div>
    );
}
