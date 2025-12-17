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

import React, { useState, useEffect } from "react";
import DashboardSidebar from "../component/dashboard/DashboardSidebar";
import DashboardStatsRow from "../component/dashboard/DashboardStatsRow";
import MyListingsPanel from "../component/dashboard/MyListingPanel";
import DashboardMessagesPanel from "../component/dashboard/DashboardMessagesPanel";
import SentMessageDashboardPage from "./SentMessageDashboardPage.jsx";
import ReceivedMessageDashboardPage from "./ReceivedMessageDashboardPage.jsx";

import messageService from "../service/messageService";
import { useAuth } from "../component/AuthContext";

export default function DashboardPage() {
    const [active, setActive] = useState("overview");
    const { user } = useAuth();
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        messageService
            .getMessagesSentByUserId(user.userId)
            .then((res) => setSentMessages(res.data || []))
            .catch((err) => {
                const status = err.response?.status;
                console.error("Failed to fetch sent messages", err);
                alert(`Message retrieval failed with status ${status}.`);
            });

        messageService
            .getMessagesReceivedByUserId(user.userId)
            .then((res) => setReceivedMessages(res.data || []))
            .catch((err) => {
                const status = err.response?.status;
                console.error("Failed to fetch received messages", err);
                alert(`Message retrieval failed with status ${status}.`);
            });
    }, []);

    return (
        <div className="db_page">
            <h2>Welcome back, Gator Learner!</h2>

            <div className="db-wrap">
                <DashboardSidebar active={active} onSelect={setActive} />

                <section className="db-card db-main">
                    {active === "overview" && (
                        <>
                            <MyListingsPanel />
                            <DashboardMessagesPanel sentMessages={sentMessages} receivedMessages={receivedMessages} />
                        </>
                    )}

                    {active === "sentMessages" && <SentMessageDashboardPage sentMessages={sentMessages} />}

                    {active === "receivedMessages" && (
                        <ReceivedMessageDashboardPage receivedMessages={receivedMessages} />
                    )}

                    {active === "myListings" && <MyListingsPanel />}
                </section>
            </div>
        </div>
    );
}
