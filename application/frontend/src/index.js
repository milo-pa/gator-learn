/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah
 * Created: 09/29/25
 * Description: Entry point for the React application, initializing analytics and rendering the app
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { initAnalytics } from "./analytics/googleAnalytics";

initAnalytics(); // Initialize Google Analytics once, before rendering the app

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
