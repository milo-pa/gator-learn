import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockListingService as TutorListingService } from "../service/mockTutorListingService";

function TutorListingPage(props) {
    const [listing, setListing] = useState(null);
    const navigate = useNavigate();

    function navigateBack() {
        navigate(-1);
    }

    useEffect(() => {
        async function loadListing() {
            const listing = await TutorListingService.getListingById(props.params.id);
            setListing(listing);
        }

        loadListing();
    }, [props.params.id]);

    if (!listing) {
        return (
            <div className="loading-wheel-container">
                <div className="loading-wheel"></div>
            </div>
        );
    }

    return (
        <div className="tutor-container">
            <h1 className="tutor-heading">Tutor Listing</h1>

            <div className="tutor-top-row">
                <div className="tutor-image-box">
                    <img src={listing.account.photoPath} alt="User Account"></img>
                </div>

                <div className="tutor-info-col">
                    <div className="tutor-title">
                        <span className="tutor-underline">{listing.account.name}</span> is tutoring {" "}
                        <span className="tutor-underline">
                            {listing.course.courseNumber} {listing.course.courseName}
                        </span>
                    </div>

                    <div className="tutor-rate-row">
                        <span>Rate: {listing.pricePerHour}.0$/hr</span>
                    </div>

                    <div>
                        <div className="tutor-availability-title">Availability:</div>
                        <div className="tutor-availability-box">{listing.availableTime}</div>
                    </div>
                </div>
            </div>

            <div className="tutor-description-wrap">
                <div className="tutor-description-title">Description:</div>
                <div className="tutor-description-box">{listing.description}</div>
            </div>

            <div className="tutor-buttons-row">
                <button className="btn btn-secondary">View Resume</button>
                <button className="btn btn-secondary">View Sample Video</button>
                <button className="btn btn-primary">Contact</button>
            </div>

            <div className="tutor-back-wrap">
                <button className="btn tutor-back-button" onClick={navigateBack}>Back</button>
            </div>
        </div>
    );
}

export default TutorListingPage;
