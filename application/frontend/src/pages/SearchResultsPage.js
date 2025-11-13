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
import TutorListingService from '../service/tutorsListingService';

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

    function removeDuplicates(arr) {
        const uniqueIds = new Set();
        return arr.filter(item => !uniqueIds.has(item.id) && uniqueIds.add(item.id));
    }

    useEffect(() => { 
        async function loadListings() {
            try {
                setLoading(true);
                setError(null);
                let response;
                if (all) {
                    const [subjectRes, courseRes] = await Promise.all([
                        TutorListingService.getListingsBySubjectSubstring(all),
                        TutorListingService.getListingsByCourseSubstring(all)
                    ]);
                    setListings(removeDuplicates([...subjectRes.data, ...courseRes.data]));
                    setLoading(false);
                    return;
                    
                }
                if (subject) {
                    response = await TutorListingService.getListingsBySubjectSubstring(subject);
                    setListings(response.data);
                    setLoading(false);
                    return;
                } 
                if (course) {
                    response = await TutorListingService.getListingsByCourseSubstring(course);
                    setListings(response.data);
                    setLoading(false);  
                    return;
                } 
                
            } catch (error) {
                setError("Failed to fetch listings.");
                setLoading(false);
            }
        }

        loadListings();
    }, [subject, course, all]);

    return (
        <main className="search-results-page">
            <header className="results-header">
                <h1 className="results-title">Current Listings</h1>
                <p className="results-subtitle">
                    Found <strong>{listings.length}</strong> {listings.length === 1 ? 'tutor' : 'tutors'}
                </p>
            </header>
            {loading && <p className="loading-message">Loading listings...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <section className="results-list">
                {listings.map((listing) => (
                    <article key={listing.id} className="tutor-card">
                        <div className="tutor-image-wrapper">
                            {/* Placeholder for tutor image */}
                            <img className="tutor-image-placeholder" src = "/images/tutor/iu_.png" alt="Tutor" />
                        </div>
                        <div className="tutor-info">
                            <div className="tutor-info-header">
                                <h2 className="tutor-name">{listing.account.name}</h2>
                                {/* Placeholder link for more details - reference to be implemented */}
                                {/* current references home page to remove errors*/}
                                <a href="/" className="tutor-link-button">View more detail</a>
                            </div>
                            <p className="tutor-subject">Subject: {listing.subject?.subjectName}</p>
                            <p className="tutor-price">Price: ${listing.pricePerHour}/hr</p>
                        <div className="tutor-actions">
                             <p className="tutor-availability">Availability: {listing.availableTime}</p>
                            <button className="tutor-message-button">MESSAGE TUTOR</button>
                        </div>
                    </div>
                </article>
                ))}
                {listings.length === 0 && (
                    <p className="no-results">No tutors found matching your criteria.</p>
                )}
            </section>
        </main>
    );
}
export default SearchResultsPage;