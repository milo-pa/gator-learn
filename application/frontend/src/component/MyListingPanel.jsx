import React from "react";

export default function MyListingsPanel({
                                            items = [
                                                { course: "CSC 220", price: "$20/hr", requests: 2, status: "Active" },
                                                { course: "CSC 230", price: "$20/hr", requests: 0, status: "Pending" },
                                                { course: "MATH 226", price: "$18/hr", requests: 4, status: "Active" },
                                            ],
                                        }) {
    const badgeClass = (status) =>
        status === "Active"  ? "badge badge--success" :
            status === "Pending" ? "badge badge--warning" :
                "badge badge--muted";

    return (
        <section className="db-card">
            <h3 style={{ marginBottom: "0.75rem" }}>My Listings</h3>

            <div className="db-table db-table--listings">
                <div className="db-table__head">
                    <div>Courses</div>
                    <div>Price</div>
                    <div>Requests</div>
                    <div>Status</div>
                </div>

                {items.map((row, i) => (
                    <div key={`${row.course}-${i}`} className="db-table__row">
                        <div>{row.course}</div>
                        <div>{row.price}</div>
                        <div>{row.requests}</div>
                        <div><span className={badgeClass(row.status)}>{row.status}</span></div>
                    </div>
                ))}
            </div>
        </section>
    );
}