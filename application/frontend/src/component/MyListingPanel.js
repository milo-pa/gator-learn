import React from "react";

export default function MyListingsPanel({
                                            items = [
                                                { course: "CSC 220", price: "$20/hr", requests: 2, status: "Active" },
                                                { course: "CSC 230", price: "$20/hr", requests: 0, status: "Pending" },
                                                { course: "MATH 226", price: "$18/hr", requests: 4, status: "Active" },
                                            ],
                                        }) {
    return (
        <section className="db-panel">
            <div className="db-panel__header">My Listings</div>

            <div className="db-table-wrap">
                <table className="db-table">
                    <thead>
                    <tr>
                        <th>Courses</th>
                        <th>Price</th>
                        <th>Requests</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((row, i) => (
                        <tr key={`${row.course}-${i}`}>
                            <td>{row.course}</td>
                            <td>{row.price}</td>
                            <td>{row.requests}</td>
                            <td>
                  <span className={`db-badge ${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
