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

function SearchBarComponent() {

    const [mode, setMode] = useState("subject");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (mode === "all" ) {
            navigate(`/results?subject=${encodeURIComponent(text)}&course=${encodeURIComponent(text)}`);
        } else {
            navigate(`/results?${mode}=${encodeURIComponent(text)}`);
        }
    };

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setMode(selectedValue);
        setText("");
    };

    const suggestions =
        mode === "course"
            ? "eg. CSC 648"
            : mode === "subject"
                ? "eg. Computer Science"
                : "eg. Computer Science, CSC 648, etc.";

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <select
                className="search-category"
                value={mode}
                onChange={handleDropdownChange}
            >
                <option value="all">All</option>
                <option value="subject">Subject</option>
                <option value="course">Course</option>
            </select>

            <input
                type="text"
                className="search-input"
                placeholder={suggestions}
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
