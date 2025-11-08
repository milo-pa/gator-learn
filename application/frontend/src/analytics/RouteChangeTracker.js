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