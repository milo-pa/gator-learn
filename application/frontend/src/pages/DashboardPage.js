import React, { useState } from "react";
import DashboardSidebar from "../component/DashboardSidebar";

export default function DashboardPage() {
    const [active, setActive] = useState("overview");

    return (
        <div style={{ padding: 24 }}>
            <h1>Hello!</h1>
            <p>Welcome back, Gator Learner!</p>

            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
                <DashboardSidebar active={active} onSelect={setActive} />
                <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
                    Selected: <strong>{active}</strong>
                </section>
            </div>
        </div>
    );
}
