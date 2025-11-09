import {useLocation} from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import TutorListingService from '../service/TutorListingService';

function useQueryParams() {
    const {search} = useLocation();
    return new URLSearchParams(search);
}

function SearchResultsPage() {
    const params = useQueryParams();
    const subject = (params.get("subject") || "").toLowerCase().trim();
    const course = (params.get("course") || "").toLowerCase().trim();

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { 
        async function loadListings() {
            try {
                setLoading(true);
                let response;
                if (subject) {
                    response = await TutorListingService.getListingsBySubjectSubstring(subject);
                } else if (course) {
                    response = await TutorListingService.getListingsByCourseSubstring(course);
                } else {
                    response = await TutorListingService.getListings();
                }
                setListings(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch listings.");
                setLoading(false);
            }
        }

        loadListings();
    }, [subject, course]);

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
                                <a href="#" className="tutor-link-button">View more detail</a>
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