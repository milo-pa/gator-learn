import { useLocation, useNavigate, useParams } from "react-router-dom";

function withNavigation(Component) {
  return props => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} params={params} navigate={navigate} location={location} />;
}
};

export default withNavigation