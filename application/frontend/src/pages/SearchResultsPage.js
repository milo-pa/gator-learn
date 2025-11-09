import {useLocation} from 'react-router-dom';
import {use, useEffect, useState} from 'react';
import {mockTutors} from '../mock/mockTutors.js';

function useQueryParams() {
    const {search} = useLocation();
    return new URLSearchParams(search);
}

function SearchResultsPage() {
    const params = useQueryParams();
    const subject = (params.get('subject') || 'all').toLowerCase().trim();
    const query = (params.get('query') || '').toLowerCase().trim();

    const [tutors, setTutors] = useState([]);

    useEffect(() => { 
        let filtered = mockTutors;
        if (subject !== "") {
            filtered = filtered.filter(
                (tutor) => tutor.subject.toLowerCase().includes(subject));
        }
        if (query !== "") {
            filtered = filtered.filter((tutor) =>
            (
                tutor.tutorName + " " + tutor.subject + " " + (tutor.description || "")
            ).toLowerCase().includes(query));
        }
        setTutors(filtered);
    },[subject, query]);

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
                            <h2 className="tutor-name">{tutor.name}</h2>
                            <p className="tutor-subject">Subject: {tutor.subject}</p>
                            <p className="tutor-price">Price: ${tutor.price}/hr</p>
                            <p className="tutor-availability">Availability: {tutor.availability}</p>
                        <div className="tutor-actions">
                            <button className="tutor-link-button">View more detail</button>
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