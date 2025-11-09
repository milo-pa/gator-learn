import { useNavigate } from "react-router-dom";
import React, { useState } from "react";





function SearchBarComponent() {

    const [mode, setMode] = useState("subject");
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (mode === "all" || text.trim() === "") {
            navigate("/results");
        } else {
            navigate(`/results?${mode}=${encodeURIComponent(text)}`);
        }
    };

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setMode(selectedValue);
        setText("");
    }

    const suggestions = 
        mode === "course" 
        ? "eg. CSC 648"
        : mode === "subject"
        ? "eg. Computer Science"
        : "eg. Computer Science, CSC 648, etc.";


    return (
        <form className="search-container" onSubmit={handleSearch}>
            <select className="search-category" value= {mode} onChange={handleDropdownChange}>
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
            />
        </form>
    );
}

export default SearchBarComponent;
