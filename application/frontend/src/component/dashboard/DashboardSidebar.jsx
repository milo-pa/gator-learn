/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/17/2025
 * Description: Vertical dashboard navigation. Highlights the active section and
 *              notifies parent via onSelect ("overview", "messages", "myListings").
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";

const ITEMS = [
    { key: "overview", label: "Overview" },
    { key: "sentMessages", label: "Sent Messages" },
    { key: "receivedMessages", label: "Received Messages" },
    { key: "myListings", label: "My Listings" },
];

export default function DashboardSidebar({ active = "overview", onSelect = () => {} }) {
    return (
        <aside className="db-sidebar" role="navigation" aria-label="Dashboard sections">
            <ul className="db-sidebar__list">
                {ITEMS.map((it) => (
                    <li key={it.key}>
                        <button
                            type="button"
                            className={`db-sidebar__btn ${active === it.key ? "is-active" : ""}`}
                            onClick={() => onSelect(it.key)}
                        >
                            {it.label}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
