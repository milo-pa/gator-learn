import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withNavigation(Component) {
    return function Wrapped(props) {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} params={params} navigate={navigate} location={location} />;
    };
}
