/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 11/18/25
 * Description: Component for hosting page navigation menu links.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TutorListingService from "../service/tutorListingService";
import { useAuth } from "../component/AuthContext";
import { buildMediaUrl } from "../util/media";

export default function UserProfilePage() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!user) return; // wait until we have the logged-in user's id

    TutorListingService.getListingsForAccountId(user.userId)
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  // while auth is being checked, don't render
  if (isLoggedIn === null) return null;

  return (
    <main className="user-profile-page">
      <header className="user-header">
        <div className="user-photo-wrapper">
          <img src ={buildMediaUrl(user.photoPath) || "/images/default-profile.png"} alt={`${user.name}'s profile`} className="user-photo" />
        </div>
        <div className="user-info">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-pronouns">{user.pronouns}</p>
          <p className="user-bio">{user.description}</p>
        </div>
      </header>
      <section className="user-listings-section">
        <h2 className="user-listings-title" >Tutor Listings</h2>
        {listings.length === 0 && <p className="no-listings">Currently no listings posted.</p>}

        <div className="user-listing-list">
          {listings.map((listing) => (
            <article key={listing.id} className="user-listing-card" onClick={() => navigate(`/listing/${encodeURIComponent(listing.listingId)}`)}>
              <div className="listing-image-wrap">
                <img src={buildMediaUrl(user.photoPath) || "/images/default-profile.png"} alt="Tutor" className="listing-image" />
              </div>

              <div className="listing-main">
                <h3 className="listing-tutor-name">{listings[0].account.name}</h3>
                <p className="listing-tutor-for">
                  <span className="listing-label">Tutoring for:</span>{" "}
                  <span className="listing-value">
                    {listing.course.courseName} - {listing.course.courseNumber}
                  </span>
                </p>
                <p className="listing-price">
                  <span className="listing-label">Price:</span>{" "}
                  <span className="listing-value">${listing.pricePerHour}/hr</span>
                </p>
                <p className="listing-times">
                  <span className="listing-label">Times Available:</span>{" "}
                  <span className="listing-value">{listing.availableTime}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
