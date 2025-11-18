import React, { useState } from "react";
import DashboardSidebar from "../component/DashboardSidebar";
import DashboardStatsRow from "../component/DashboardStatsRow";
import MyListingsPanel from "../component/MyListingPanel";
import DashboardMessagesPanel from "../component/DashboardMessagesPanel";
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


                            <MyListingsPanel
                                rows={[
                                    { id: 1, course: "CSC 220", price: "$20/hr", requests: 2, status: "Active" },
                                    { id: 2, course: "CSC 220", price: "$20/hr", requests: 0, status: "Pending" },
                                    { id: 3, course: "CSC 220", price: "$20/hr", requests: 4, status: "Active" },
                                ]}
                            />

                            <DashboardMessagesPanel
                                messages={[
                                    { id: 1, name: "Sarah", course: "CSC 220", kind: "received", ago: "2 hr" },
                                    { id: 2, name: "Jamal", course: "CSC 220", kind: "sent", ago: "10 hr" },
                                ]}
                            />
                        </>



                    )}

                    {active === "messages" && <div className="db-muted">Latest Messages (coming next)</div>}
                    {active === "myListings" && <div className="db-muted">My Listings (coming soon)</div>}
                </section>
            </div>
        </div>
    );
}
