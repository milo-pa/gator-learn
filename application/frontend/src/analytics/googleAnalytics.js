/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created: 11/5/25
 * Description:
 *  Defines functions for adding the git tag to index.html on refreshes and tracking events,
 *  which is essential since we are using a Single Page Application, which means the index.html
 *  is not updated on every page click. It only triggers in production
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export function initAnalytics() {
    // Only run in production builds AND only if we actually have an ID
    if (process.env.NODE_ENV !== "production") return;
    if (!GA_MEASUREMENT_ID) return;

    // Avoid loading twice
    if (window.gtag) return;

    // Load the GA script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Setup dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Initialize GA
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false, // SPA: we'll handle pageviews on route changes
    });
}


/**
 * Simple event tracking helper.
 * Use trackEvent('event_name', { param1: 'x' });
 */
export function trackEvent(eventName, params = {}) {
    if (!window.gtag) return;
    window.gtag("event", eventName, params);
}