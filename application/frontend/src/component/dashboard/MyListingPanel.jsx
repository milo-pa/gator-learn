/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/17/2025
 * Description: Displays the user's tutor listings in a 4-column table (Course, Price,
 *              Requests, Status) with status badges.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

export default function MyListingsPanel({
    items = [
        { course: "CSC 220", price: "$20/hr", requests: 2, status: "Active" },
        { course: "CSC 230", price: "$20/hr", requests: 0, status: "Pending" },
        { course: "MATH 226", price: "$18/hr", requests: 4, status: "Active" },
    ],
}) {
    const badgeClass = (status) =>
        status === "Active"
            ? "badge badge--success"
            : status === "Pending"
            ? "badge badge--warning"
            : "badge badge--muted";

    return (
        <section className="db-card">
            <h3 style={{ marginBottom: "0.75rem" }}>My Listings</h3>

            <div className="db-table db-table--listings">
                <div className="db-table__head">
                    <div>Courses</div>
                    <div>Price</div>
                    <div>Requests</div>
                    <div>Status</div>
                </div>

                {items.map((row, i) => (
                    <div key={`${row.course}-${i}`} className="db-table__row">
                        <div>{row.course}</div>
                        <div>{row.price}</div>
                        <div>{row.requests}</div>
                        <div>
                            <span className={badgeClass(row.status)}>{row.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
