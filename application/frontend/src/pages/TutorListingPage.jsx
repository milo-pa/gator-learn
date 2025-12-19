/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah
 * Created: 11/17/2025
 * Description: React component for displaying detailed information on a single tutor listing.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TutorListingService from "../service/tutorListingService";
import MessageTutorPopUp from "../component/MessageTutorPopUp";

function TutorListingPage(props) {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  function navigateBack() {
    navigate(-1);
  }
  const handleContact = (listing) => {
    setSelectedListing(listing);
    setShowPopUp(true);
  };
  const handleClosePopUp = () => {
    setShowPopUp(false);
    setSelectedListing(null);
  };

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
          <img
            src={listing.account?.photoPath || "/images/tutor/iu_.png"}
            alt="User Account"
            className = "tutor-img"
          ></img>
        </div>

        <div className="tutor-info-col">
          <div className="tutor-title">
            <span className="tutor-underline">{listing.account.name}</span> is tutoring{" "}
            <span className="tutor-underline">
              {listing.course.courseNumber} {listing.course.courseName}
            </span>
          </div>

          <div className="tutor-rate-row">
            <span>Rate: {listing.pricePerHour}$/hr</span>
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
        {listing.resumePath && (
          <a
            className="btn btn-secondary"
            href={listing.resumePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        )}
        {listing.tutoringVideoSamplePath && (
          <a
            className="btn btn-secondary"
            href={listing.tutoringVideoSamplePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Sample Video
          </a>
        )}
        <button className="btn btn-primary" onClick={() => handleContact(listing)}>
          Contact
        </button>
      </div>
      {showPopUp && selectedListing && <MessageTutorPopUp listing={selectedListing} onClose={handleClosePopUp} />}

      <div className="tutor-back-wrap">
        <button className="btn tutor-back-button" onClick={navigateBack}>
          Back
        </button>
      </div>

      {showPopUp && selectedListing && <MessageTutorPopUp listing={selectedListing} onClose={handleClosePopUp} />}
    </div>
  );
}

export default TutorListingPage;
