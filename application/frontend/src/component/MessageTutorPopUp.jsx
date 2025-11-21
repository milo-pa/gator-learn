/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created:
 * Description: Functional component for the pop up to send a message to a tutor
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";

function MessageTutorPopUp({ listing, onClose }) {
    const [contactMethod, setContactMethod] = useState("");
    const [comments, setComments] = useState("");

    const tutorName = listing?.account?.name || "Tutor";
    const className = listing?.subject?.subjectName || "Class";

    const handleSubmit = (e) => {
        e.preventDefault();
        // later: send to backend
        console.log({
            listingId: listing?.listingId,
            contactMethod,
            comments,
        });
        onClose && onClose();
    };

    return (
        <div className="popup-backdrop">
            <div className="popup message-popup">
                {/* top-right X */}
                <button
                    type="button"
                    className="message-popup-close-icon btn-light"
                    aria-label="Close"
                    onClick={onClose}
                >
                    ×
                </button>

                <h3 className="popup-title message-popup-title">
                    Message:{" "}
                    <span className="message-popup-strong">{tutorName}</span> for{" "}
                    <span className="message-popup-strong">{className}</span>
                </h3>
                <div className="message-popup-divider" />

                <form className="message-popup-form" onSubmit={handleSubmit}>
                    {/* Preferred contact method */}
                    <label htmlFor="contact-method" className="message-popup-label">
                        Preferred contact method:
                    </label>
                    <textarea
                        id="contact-method"
                        className="message-popup-textarea"
                        placeholder="Discord: Username123 or SFSU email"
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                    />

                    {/* Comments */}
                    <label htmlFor="comments" className="message-popup-label">
                        Comments:
                    </label>
                    <textarea
                        id="comments"
                        className="message-popup-textarea message-popup-textarea-comments"
                        placeholder="I have a midterm next Tuesday. Can we meet online?"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />

                    <div className="message-popup-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MessageTutorPopUp;