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

import React, { useState, useEffect } from "react";
import "../styles/HomePage.scss";
import MessageTutorPopUp from "../component/MessageTutorPopUp";
import TutorListingService from "../service/tutorListingService";


export default function HomePage() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(false);


  const RECENT_LIMIT = 4;

  useEffect(() => {
    async function loadRecent() {
      try {
        setLoading(true);

        const res = await TutorListingService.getAllListings();
         console.log(
        "Listing IDs from backend:",
        res.data.map(l => l.listingId)
      );
        const data = res.data || [];

        const sorted = [...data].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return (b.listingId ?? 0) - (a.listingId ?? 0);
        });

        setRecentListings(sorted.slice(0, RECENT_LIMIT));
      } catch (e) {
        console.error("Failed to load recent listings", e);
        setRecentListings([]);
      } finally {
        setLoading(false);
      }
    }

    loadRecent();
  }, []);

  const formatCourse = (listing) => {
    const name = listing.course?.courseName || "";
    const num = listing.course?.courseNumber || "";
    return `${name} ${num}`.trim() || "Unknown course";
  };

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
          <p>Peer tutoring made easy by SF State students, for SF State students.</p>
          <p>
            Ready to learn? Use the search bar to start your search for tutors
            that teach your subject!
          </p>
        </div>
      </div>

      <section className="recent-listings">
        <h2>Recently Posted Listings</h2>

        {loading && <p>Loading recent listings...</p>}

        <div className="recent-listings-grid">
          {recentListings.map((listing) => (
            <div key={listing.listingId} className="recent-listing-card">
              <h3>{listing.account?.name || "Unknown Tutor"}</h3>

              <p>
                <strong>Subject:</strong> {listing.subject?.subjectName || "Unknown"}
              </p>
              <p>
                <strong>Course:</strong> {formatCourse(listing)}
              </p>

              <p className="price">${Number(listing.pricePerHour).toFixed(2)}/hr</p>

              <button
                className="btn btn-primary"
                onClick={() => setSelectedListing(listing)}
              >
                Message Tutor
              </button>
            </div>
          ))}

          {!loading && recentListings.length === 0 && (
            <p>No recent listings yet.</p>
          )}
        </div>
      </section>

      {selectedListing && (
        <MessageTutorPopUp
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  );
}