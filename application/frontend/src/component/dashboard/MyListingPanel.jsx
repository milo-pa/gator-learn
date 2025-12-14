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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockListingService as TutorListingService } from "../../service/mockTutorListingService";

export default function MyListingsPanel() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        TutorListingService.getListingsByAccount(1).then((res) => setListings(res.data));
    }, []);

    console.log(listings);

    const badgeClass = (status) =>
        status === 1 ? "badge badge--success" : status === 0 ? "badge badge--warning" : "badge badge--muted";

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

                {listings.map((row, i) => (
                    <div
                        key={`${row.course.courseNumber}-${i}`}
                        className="db-table__row"
                        onClick={() => navigate(`/listing/${encodeURIComponent(row.listingId)}`)}
                    >
                        <div>{row.course.courseNumber}</div>
                        <div>{row.pricePerHour}$ / hr</div>
                        <div>???</div>
                        <div>
                            <span className={badgeClass(row.live)}>{row.live === 1 ? "Active" : "Inactive"}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
