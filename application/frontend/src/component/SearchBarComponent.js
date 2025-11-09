import { useNavigate } from "react-router-dom";
import React, {useState} from "react";





function SearchBarComponent() {
        const [subject, setSubject] = useState("");
        const  navigate = useNavigate();
        const handleSearch = (e) => {
            e.preventDefault();
            navigate(`/results?subject=${encodeURIComponent(subject)}`);
        }

        const handleDropdownChange = (e) => {
            const selectedValue = e.target.value;
            setSubject(selectedValue === "all" ? "" : selectedValue);
        }

        return (
        <form className = "search-container" onSubmit={handleSearch}>
            <select className="search-category" onChange={handleDropdownChange}>
                {/* Placeholder options for categories
                 Ideally we want this to be suppplied by DB */}
                <option value="all">All</option>
                <option value="cs">Computer Science</option>
                <option value="business">Business</option>
            </select>
            <input
                type="text" 
                className="search-input" 
                placeholder="eg. CSC 648"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
        </form>
    );
}  

export default SearchBarComponent;
