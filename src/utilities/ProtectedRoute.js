import Cookies from "js-cookie";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const userId = Cookies.get("user_id");

  if (userId) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
