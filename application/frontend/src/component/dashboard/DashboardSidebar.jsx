import React from "react";


const ITEMS = [
    {key: "overview", label: "Overview"},
    {key: "messages", label: "Messages"},
    {key: "myListings", label: "My Listings"},
];

export default function DashboardSidebar({ active = "overview", onSelect = () => {}}){
    return(
        <aside className="db-sidebar" role="navigation" aria-label="Dashboard sections">
            <ul className="db-sidebar__list">
                {ITEMS.map((it) => (
                    <li key={it.key}>
                        <button
                            type="button"
                            className={`db-sidebar__btn ${active === it.key ? "is-active" : ""}`}
                            onClick={() => onSelect(it.key)}
                            >
                            {it.label}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
