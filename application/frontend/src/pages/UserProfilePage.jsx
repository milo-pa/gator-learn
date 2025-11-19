import React from "react";
import "../styles/user-profile.scss";

import {MOCK_USER, MOCK_USER_LISTINGS} from "../mock/mockUser";

function UserProfilePage() {

    return (
        <main className="user-profile-page">
            <header className="user-header">
                <div className="user-photo-wrapper">
                    <img 
                        src={MOCK_USER.profileImage}
                        alt={`${MOCK_USER.name} profile`}
                        className="user-photo"/>
                </div>
                <div className="user-info">
                    <h1 className="user-name">{MOCK_USER.name}</h1>
                    <p className="user-pronouns">{MOCK_USER.pronouns}</p>
                    <p className="user-bio">{MOCK_USER.bio}</p>

                </div>
            </header>
            <section className="user-listings-section">
                <h2 className="user-listings-title">Tutor Listings</h2>
                {MOCK_USER_LISTINGS.length === 0 && (
                    <p className="no-listings">
                        Currently no listings posted.

                    </p>
                )}

                <div className="user-listing-list">
                    {MOCK_USER_LISTINGS.map((listing) => (
                        <article key={listing.id} className="user-listing-card">
                            <div className="listing-image-wrap">
                                <img
                                    src="/images/tutor/iu_.png"
                                    alt="Tutor"
                                    className="listing-image"
                                />

                            </div>

                            <div className="listing-main">
                                <h3 className="listing-tutor-name">{MOCK_USER.name}</h3>
                                <p className="listing-tutor-for">
                                    <span className="listing-label">Tutoring for:</span>{" "}
                                    <span className="listing-value">
                                        {listing.subject} - {listing.course}
                                    </span>

                                </p>
                                <p className="listing-price">
                                    <span className="listing-label">Price:</span>{" "}
                                    <span className="listing-value">
                                        ${listing.pricePerHour}/hr
                                    </span>
                                </p>
                                <p className="listing-times">
                                    <span className="listing-label">Times Available:</span>{" "}
                                    <span className="listing-value">
                                        {listing.timeAvailable}
                                    </span>
                                </p>
                            </div>
                            <div className="listing-action">
                                <button className="listing-details-btn">
                                    View more details
                                </button>
                                <button className="listing-message-btn">
                                    MESSAGE TUTOR
                                </button>

                            </div>

                        </article>
                    ))}

                </div>


            </section>

        </main>

    );
}

export default UserProfilePage;