/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez 
 * Created: 12/13/2025
 * Description: Component for hosting page navigation menu links.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { useNavigate } from "react-router-dom";

function ListingCardComponent({
    listing,
    variant = "default",
    showMessageButton = true,
    showViewMoreButton = true,
    onMessage,
}) {
    const navigate = useNavigate();

    const {
        id,
        tutorName,
        subject,
        course,
        pricePerHour,
        availableTime,
        profileImageUrl,
    } = listing;

    const handleViewMore = () => {
        navigate(`/listing/${id}`);
    }

    const handleMessage = () => {
        if (onMessage) {
            onMessage(listing);
        }
        // TODO: need to link to listing id/tuotr to actually send message
    }

    // TODO: need to add the date for sorting 
    return (
        <article className={`listing-card listing-card-${variant}`} onClick={showViewMoreButton ? handleViewMore : undefined}>
            <img className="listing-card-img" src={profileImageUrl || "/images/tutor/iu_.png"} alt={`${tutorName}'s profile`} />

            <div className="listing-card-body">
                <h2 className="listing-card-name">{tutorName}</h2>
                <div className="listing-card-row">
                    <span className="listing-card-label">Subject:</span>
                    <span className="listing-card-value">{subject || "-"}</span>
                </div>
                <div className="listing-card-row">
                    <span className="listing-card-label">Course:</span>
                    <span className="listing-card-value">{course || "-"}</span>
                </div>
                <div className="listing-card-row">
                    <span className="listing-card-label">Price Per Hour:</span>
                    <span className="listing-card-value">${Number(pricePerHour).toFixed(2)}/hr</span>
                </div>
                <div className="listing-card-row listing-card-availability">
                    <span className="listing-card-label">Times Available:</span>
                    <ul className="listing-card-times">{(availableTime|| "-")
                        .split(',')
                        .map((t, i) => <li key={i}>{t.trim()}</li>)}</ul>
                </div>
                <div className="listing-card-btns">
                    {showMessageButton && (
                        <button
                            type="button"
                            className="listing-card-message"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMessage();
                            }}
                        >
                            Message Tutor
                        </button>
                    )}

                </div>



            </div>
        </article>
    );



}

export default ListingCardComponent;