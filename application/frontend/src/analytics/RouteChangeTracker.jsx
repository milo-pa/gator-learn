/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created: 11/5/2025
 * Description:
 *  This component is added to all pages in App.js and tracks page changes
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteChangeTracker() {
    const location = useLocation();

    useEffect(() => {
        // Only send page_view if GA is initialized
        if (!window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: location.pathname + location.search,
            page_title: document.title,
        });
    }, [location]);

    return null;
}

export default RouteChangeTracker;