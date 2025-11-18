import React, { useState } from "react";
import DashboardSidebar from "../component/DashboardSidebar";
import DashboardStatsRow from "../component/DashboardStatsRow";
import MyListingsPanel from "../component/MyListingPanel";
export default function DashboardPage() {
    const [active, setActive] = useState("overview");

    return (
        <div className="db_page">
            <h1>Hello!</h1>
            <p>Welcome back, Gator Learner!</p>

            <div className="db-wrap">
                <DashboardSidebar active={active} onSelect={setActive} />

                <section className="db-card db-main">
                    {active === "overview" && (
                        <>
                            <DashboardStatsRow activeListings={2} pendingRequests={1} totalRequests={9} />


                            <MyListingsPanel/>
                        </>



                    )}

                    {active === "messages" && <div className="db-muted">Latest Messages (coming next)</div>}
                    {active === "myListings" && <div className="db-muted">My Listings (coming soon)</div>}
                </section>
            </div>
        </div>
    );
}
