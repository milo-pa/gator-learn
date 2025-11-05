import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { initAnalytics } from "./analytics/ga";

initAnalytics(); // Initialize Google Analytics once, before rendering the app

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
