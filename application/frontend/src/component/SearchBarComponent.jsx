/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez 
 * Created: 11/08/25
 * Description: Component for the search bar allowing users to search tutor listings by subject or course.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SUBJECT_OPTIONS } from "../mock/mockOptions";

function SearchBarComponent() {
    
    const [subject, setSubject] = useState("all");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const subjectParam = encodeURIComponent(subject);
        const textParam = encodeURIComponent(text.trim());

        navigate(`/results?subject=${subjectParam}&course=${textParam}`);
    };

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setSubject(selectedValue);
        setText("");
    };



    return (
        <form className="search-container" onSubmit={handleSearch}>
            <select
                className="search-category"
                value={subject}
                onChange={handleDropdownChange}
            >
                <option value="all">All Subjects</option>
                {SUBJECT_OPTIONS.map((subj) => (
                    <option key={subj.id} value={subj.name}>
                        {subj.name}
                    </option>
                ))}
    
            </select>

            <input
                type="text"
                className="search-input"
                placeholder="e.g., CSC 220, 220, Data Structures"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={40}
            />

            <button type="submit" className="btn-primary search-btn">
                Search
            </button>
        </form>
    );
}

export default SearchBarComponent;
