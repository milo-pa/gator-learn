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
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { mockListingService as TutorListingService } from "../service/mockTutorListingService";
import MessageTutorPopUp from "../component/MessageTutorPopUp";
import ListingCardComponent from '../component/ListingCardComponent';

/* Custom hook to parse query parameters */
function useQueryParams() {
    const { search } = useLocation();
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
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [sortKey, setSortKey] = useState("");

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
            if (uniqueIds.has(item.id)) {
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

    const getCreatedAtDate = (listing) => {
        const date = new Date(listing.createdAt);
        return isNaN(date) ? 0 : date;
    }

    const sortedListings = [...listings].sort((a, b) => {
        if (sortKey === "asc") {
            return (Number(a.pricePerHour) - Number(b.pricePerHour));
        }
        if (sortKey === "desc") {
            return (Number(b.pricePerHour) - Number(a.pricePerHour));
        }
        if (sortKey === "newest") {
            return getCreatedAtDate(b) - getCreatedAtDate(a);
        }
        if (sortKey === "oldest") {
            return getCreatedAtDate(a) - getCreatedAtDate(b);
        }
        return 0;
    });

    const toCardListing = (l) => ({
        id: l.listingId,
        createdAt: l.createdAt,
        tutorName: l.account?.name,
        subject: l.subject?.subjectName,
        course: l.course?.courseName,
        pricePerHour: l.pricePerHour,
        description: l.description,
        availableTime: l.availableTime,
        profileImageUrl: l.account?.photoPath,
    })
    

    return (
        <main className="search-results-page">

            <header className="results-header">
                <div className="results-header-left">
                    <h1 className="results-title">Current Listings</h1>
                    <p className="results-subtitle">
                        Found <strong>{listings.length}</strong> {listings.length === 1 ? 'tutor' : 'tutors'}
                    </p>
                </div>
                <div className="results-header-right">
                    <select
                        id="results-sort-select"
                        className="sort-dropdown"
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                    >
                        <option value="">-- Sort --</option>
                        <option value="asc">$ to $$$</option>
                        <option value="desc">$$$ to $</option>
                        <option value="newest">Newest Listings</option>
                        <option value="oldest">Oldest Listings</option>
                    </select>
                </div>
            </header>
            {loading && <p className="loading-message">Loading listings...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <section className="results-grid">
                {sortedListings.map((listing) => {
                    const cardListing = toCardListing(listing);
                    return (
                        <ListingCardComponent
                            key={listing.listingId}
                            listing={cardListing}
                            onMessage={handleMessageClick}
                        />
                    );
                })}
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