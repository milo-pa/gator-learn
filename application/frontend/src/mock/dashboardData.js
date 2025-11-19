/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Hill Kalathiya
 * Created: 11/18/2025
 * Description: Centralized mock data for the Dashboard UI (stats, listings, messages).
 *              Replace with API calls in a future milestone.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const DASHBOARD_STATS = {
    activeListings: 3,
    pendingRequests: 1,
    totalRequests: 9,
};

export const MY_LISTINGS = [
    { course: "CSC 220",  price: "$20/hr", requests: 2, status: "Active"  },
    { course: "CSC 230",  price: "$20/hr", requests: 0, status: "Pending" },
    { course: "MATH 226", price: "$18/hr", requests: 4, status: "Active"  },
];

export const MESSAGES = [
    { id: 1, name: "Sarah", course: "CSC 220", kind: "received", ago: "2 hr" },
    { id: 2, name: "Jamal", course: "CSC 220", kind: "sent",     ago: "10 hr" },
];
