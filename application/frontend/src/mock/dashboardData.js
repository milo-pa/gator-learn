// Simple, central mock data for the dashboard (no backend yet)

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
