/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Enrique Liganor
 * Created: 11/08/25
 * Description:
 * Home Page functional component routed to default.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import "../styles/HomePage.scss";
import MessageTutorPopUp from "../component/MessageTutorPopUp";

const recentListings = [
    {
        listingId: 1,
        account: { name: "Alice Kim" },
        subject: { subjectName: "Computer Science" },
        course: "Operating Systems",
        pricePerHour: 25,
    },
    {
        listingId: 2,
        account: { name: "Alice Kim" },
        subject: { subjectName: "Computer Science" },
        course: "Data Structures",
        pricePerHour: 24,
    },
    {
        listingId: 3,
        account: { name: "Alice Kim" },
        subject: { subjectName: "Mathematics" },
        course: "Calculus I",
        pricePerHour: 20,
    },
    {
        listingId: 4,
        account: { name: "Alice Kim" },
        subject: { subjectName: "Psychology" },
        course: "Calculus I",
        pricePerHour: 22,
    },
];

export default function HomePage() {
    const [selectedListing, setSelectedListing] = useState(null);

    return (
        <>
            <div className="home-hero">
                <img
                    src="/images/HomePage/CoolGator.webp"
                    alt="Gator mascot"
                    className="hero-image"
                />

                <div className="hero-text">
                    <h1>Studying for Gators by Gators!</h1>
                    <p>
                        Peer tutoring made easy by SF State students, for SF State students.
                    </p>
                    <p>
                        Ready to learn? Use the search bar to start your search for tutors
                        that teach your subject!
                    </p>
                </div>
            </div>

            {/* Recently Posted Listings section */}
            <section className="recent-listings">
                <h2>Recently Posted Listings</h2>

                <div className="recent-listings-grid">
                    {recentListings.map((listing) => (
                        <div key={listing.listingId} className="recent-listing-card">
                            <h3>{listing.account.name}</h3>

                            <p>
                                <strong>Subject:</strong> {listing.subject.subjectName}
                            </p>
                            <p>
                                <strong>Course:</strong> {listing.course}
                            </p>
                            <p className="price">${listing.pricePerHour}/hr</p>

                            <button
                                className="btn btn-primary"
                                onClick={() => setSelectedListing(listing)}
                            >
                                Message Tutor
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Message Pop-up section */}
            {selectedListing && (
                <MessageTutorPopUp
                    listing={selectedListing}
                    onClose={() => setSelectedListing(null)}
                />
            )}
        </>
    );
}
