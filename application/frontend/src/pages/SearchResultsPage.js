import {useLocation} from 'react-router-dom';
import React, { useEffect, useState} from 'react';

function useQueryParams() {
    const {search} = useLocation();
    return new URLSearchParams(search);
}

function SearchResultsPage() {
    const params = useQueryParams();
    const subject = (params.get("subject") || "").toLowerCase().trim();
    const course = (params.get("course") || "").toLowerCase().trim();

    const [tutors, setTutors] = useState([]);

    useEffect(() => { 
        async function fetchListings() {
            try {
                let url = '/api/listings';
                if (course) {
                    url = `/api/listings?course=${encodeURIComponent(course)}`;
                } else if (subject) {
                    url = `/api/listings?subject=${encodeURIComponent(subject)}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTutors(data);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        }
        fetchListings();
    }, [subject, course]);

    return (
        <main className="search-results-page">
            <header className="results-header">
                <h1 className="results-title">Current Listings</h1>
                <p className="results-subtitle">
                    Found <strong>{tutors.length}</strong> {tutors.length === 1 ? 'tutor' : 'tutors'}
                </p>
            </header>
            <section className="results-list">
                {tutors.map((tutor) => (
                    <article key={tutor.id} className="tutor-card">
                        <div className="tutor-image-wrapper">
                            {/* Placeholder for tutor image */}
                            <div className="tutor-image-placeholder">Image</div>
                        </div>
                        <div className="tutor-info">
                            <div className="tutor-info-header">
                                <h2 className="tutor-name">{tutor.name}</h2>
                                <a href="#" className="tutor-link-button">View more detail</a>
                            </div>
                            <p className="tutor-subject">Subject: {tutor.subject}</p>
                            <p className="tutor-price">Price: ${tutor.pricePerHour}/hr</p>
                        <div className="tutor-actions">
                             <p className="tutor-availability">Availability: {tutor.availability}</p>
                            <button className="tutor-message-button">MESSAGE TUTOR</button>
                        </div>
                    </div>
                </article>
                ))}
                {tutors.length === 0 && (
                    <p className="no-results">No tutors found matching your criteria.</p>
                )}
            </section>
        </main>
    );
}
export default SearchResultsPage;