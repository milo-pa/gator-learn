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
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TutorListingService from "../service/tutorListingService";
import MessageTutorPopUp from "../component/MessageTutorPopUp";
import { buildMediaUrl } from "../util/media";
import ListingCardComponent from "../component/ListingCardComponent";

function parseCourseQuery(q) {
    const s = (q || "").trim();

    // grab letters part + digits part, in any order like "CSC 415", "csc415", "415", "CSC"
    const letters = (s.match(/[a-zA-Z]+/g) || []).join("").trim();
    const digits = (s.match(/\d+/g) || []).join("").trim();

    return {
        raw: s,
        courseName: letters || "", // "CSC"
        courseNumber: digits || "", // "415"
    };
}

function useQueryParams() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}

function SearchResultsPage() {
    const params = useQueryParams();

    const subject = (params.get("subject") || "all").trim();
    const course = (params.get("course") || "").trim();
    const all = (params.get("all") || "").trim();

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [sortKey, setSortKey] = useState("");

    const handleMessageClick = (listing) => {
        setSelectedListing(listing);
        setShowPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
        setSelectedListing(null);
    };

    function removeDuplicates(arr) {
        const seen = new Set();
        return arr.filter((item) => {
            const key = item.listingId ?? item.id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    async function fetchCourseMatches(courseQuery) {
        const { courseName, courseNumber, raw } = parseCourseQuery(courseQuery);

        if (!raw) return [];

        if (courseNumber && !courseName) {
            const res = await TutorListingService.searchListings({ courseNumber });
            return res.data || [];
        }

        if (courseName && !courseNumber) {
            const res = await TutorListingService.searchListings({ courseName });
            return res.data || [];
        }

        const [nameRes, numRes] = await Promise.all([
            TutorListingService.searchListings({ courseName }),
            TutorListingService.searchListings({ courseNumber }),
        ]);

        return removeDuplicates([...(nameRes.data || []), ...(numRes.data || [])]);
    }

    useEffect(() => {
        async function loadListings() {
            try {
                setLoading(true);
                setError(null);

                if (subject === "all" && course) {
                    const [subjectRes, courseMatches] = await Promise.all([
                        TutorListingService.getListingsBySubjectSubstring(course),
                        fetchCourseMatches(course),
                    ]);

                    setListings(removeDuplicates([...(subjectRes.data || []), ...courseMatches]));
                    return;
                }

                if (subject && subject !== "all" && course) {
                    const [subjectRes, courseMatches] = await Promise.all([
                        TutorListingService.getListingsBySubjectSubstring(subject),
                        fetchCourseMatches(course),
                    ]);

                    const courseIds = new Set(courseMatches.map((l) => l.listingId));
                    const intersection = (subjectRes.data || []).filter((l) => courseIds.has(l.listingId));

                    setListings(intersection);
                    return;
                }

                if (subject && subject !== "all") {
                    const response = await TutorListingService.getListingsBySubjectSubstring(subject);
                    setListings(response.data || []);
                    return;
                }

                if (course) {
                    const courseMatches = await fetchCourseMatches(course);
                    setListings(courseMatches);
                    return;
                }

                const response = await TutorListingService.getAllListings();
                setListings(response.data || []);
            } catch (err) {
                setError("Failed to fetch listings.");
            } finally {
                setLoading(false);
            }
        }

        loadListings();
    }, [subject, course]);

    const getCreatedAtMs = (listing) => {
        // try common backend field names
        const raw =
            listing.createdAt ?? listing.created_at ?? listing.createdDate ?? listing.created_on ?? listing.timestamp;

        const ms = raw ? new Date(raw).getTime() : NaN;

        if (!Number.isFinite(ms)) return Number(listing.listingId) || 0;

        return ms;
    };

    const sortedListings = [...listings].sort((a, b) => {
        if (sortKey === "asc") {
            return Number(a.pricePerHour) - Number(b.pricePerHour);
        }
        if (sortKey === "desc") {
            return Number(b.pricePerHour) - Number(a.pricePerHour);
        }
        if (sortKey === "newest") {
            return getCreatedAtMs(b) - getCreatedAtMs(a);
        }
        if (sortKey === "oldest") {
            return getCreatedAtMs(a) - getCreatedAtMs(b);
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
        profileImageUrl: buildMediaUrl(l.account?.photoPath),
    });

    return (
        <main className="search-results-page">
            <header className="results-header">
                <div className="results-header-left">
                    <h1 className="results-title">Current Listings</h1>
                    <p className="results-subtitle">
                        Found <strong>{listings.length}</strong> {listings.length === 1 ? "tutor" : "tutors"}
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
                            onMessage={() => handleMessageClick(listing)}
                        />
                    );
                })}
                {listings.length === 0 && <p className="no-results">No tutors found matching your criteria.</p>}
            </section>

            {showPopUp && selectedListing && <MessageTutorPopUp listing={selectedListing} onClose={handleClosePopUp} />}
        </main>
    );
}
export default SearchResultsPage;
