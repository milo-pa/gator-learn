/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 11/08/25
 * Description: 
 * Page component for displaying search results of tutor listings based on query parameters.
 * 
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useLocation} from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { mockListingService as TutorListingService } from "../service/mockTutorListingService";
import MessageTutorPopUp from "../component/MessageTutorPopUp";

/* Custom hook to parse query parameters */
function useQueryParams() {
    const {search} = useLocation();
    return new URLSearchParams(search);
}

function SearchResultsPage() {
    const params = useQueryParams();

    const subject = (params.get("subject") || "").toLowerCase().trim();
    const course = (params.get("course") || "").toLowerCase().trim();
    const all = (params.get("all") || "").toLowerCase().trim();

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder,setSortOrder] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    // open popup for a specific listing
    const handleMessageClick = (listing) => {
        setSelectedListing(listing);
        setShowPopUp(true);
    };

    // close popup
    const handleClosePopUp = () => {
        setShowPopUp(false);
        setSelectedListing(null);
    };

    function removeDuplicates(arr) {
        const uniqueIds = new Set();
        return arr.filter((item) => {
            if(uniqueIds.has(item.id)) {
                return false;
            }
            uniqueIds.add(item.id);
            return true;
        });
    }

    useEffect(() => { 
        async function loadListings() {
            try {
                setLoading(true);
                setError(null);
                
                if (all) {
                    const [subjectRes, courseRes] = await Promise.all([
                        TutorListingService.getListingsBySubjectSubstring(all),
                        TutorListingService.getListingsByCourseSubstring(all)
                    ]);
                    const combined = [
                        ...subjectRes.data,
                        ...courseRes.data,
                    ];
                    setListings(removeDuplicates(combined));
                    setLoading(false);
                    return;
                    
                }
                if (subject) {
                    const response = await TutorListingService.getListingsBySubjectSubstring(subject);
                    setListings(response.data);
                    setLoading(false);
                    return;
                } 
                if (course) {
                    const response = await TutorListingService.getListingsByCourseSubstring(course);
                    setListings(response.data);
                    setLoading(false);  
                    return;
                } 
                const response = await TutorListingService.getAllListings();
                setListings(response.data);
                setLoading(false);
                
            } catch (error) {
                setError("Failed to fetch listings.");
                setLoading(false);
            }
        }
        loadListings();
    }, [subject, course, all]);
    
    const handleChange = (e) => {
        setSortOrder(e.target.value || null);
    }

    const sortedListings = sortOrder 
        ?[...listings].sort((a,b) => {
            const priceA = Number(a.pricePerHour) || 0;
            const priceB = Number(b.pricePerHour) || 0;

            if (sortOrder === "asc") {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        })
        : listings;

    return (
        <main className="search-results-page">

            <header className="results-header">
                <div className = "results-header-left">
                    <h1 className="results-title">Current Listings</h1>
                    <p className="results-subtitle">
                        Found <strong>{listings.length}</strong> {listings.length === 1 ? 'tutor' : 'tutors'}
                    </p>
                </div>
                <div className="results-header-right">
                    <select 
                        id = "results-sort-select"
                        className="sort-dropdown"
                        value={sortOrder || ""}
                        onChange={handleChange} 
                    >
                        <option value="">-- Sort by price--</option>
                        <option value="asc">$ to $$$ (cheapest first)</option>
                        <option value="desc">$$$ to $ (most expensive first)</option>
                    </select>
                </div>
            </header>
            {loading && <p className="loading-message">Loading listings...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <section className="results-list">
                {sortedListings.map((listing) => (
                    <article key={listing.listingId} className="tutor-card">
                        <div className="tutor-image-wrapper">
                            {/* Placeholder for tutor image */}
                            <img className="tutor-image-placeholder" src = "/images/tutor/iu_.png" alt="Tutor" />

                        </div>
                        <div className="tutor-info">
                            <div className="tutor-info-header">
                                <h2 className="tutor-name">{listing.account.name}</h2>
                                <Link className="tutor-link-button" to={`/listing/${encodeURIComponent(listing.listingId)}`}>View details</Link>
                            </div>
                            <p className="tutor-subject">Subject: {listing.subject?.subjectName}</p>
                            <p className="tutor-price">Price: ${listing.pricePerHour}/hr</p>
                        <div className="tutor-actions">
                            <p className="tutor-availability">Availability: {listing.availableTime}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleMessageClick(listing)}
                            >
                                MESSAGE TUTOR
                            </button>
                        </div>
                    </div>
                </article>
                ))}
                {listings.length === 0 && (
                    <p className="no-results">No tutors found matching your criteria.</p>
                )}
            </section>

            {showPopUp && selectedListing && (
                <MessageTutorPopUp
                    listing={selectedListing}
                    onClose={handleClosePopUp}
                />
            )}

        </main>
    );
}
export default SearchResultsPage;