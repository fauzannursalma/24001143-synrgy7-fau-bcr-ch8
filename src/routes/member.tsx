import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

const MemberRoute = () => {
  const isAuthenticatedUser = isAuthenticated();

  const isAuthorized =
    isAuthenticatedUser &&
    isAuthenticatedUser.token &&
    (isAuthenticatedUser.user.role === "admin" ||
      isAuthenticatedUser.user.role === "superadmin" ||
      isAuthenticatedUser.user.role === "member");

  return isAuthorized ? <Outlet /> : <Navigate to="/signin" />;
};

export default MemberRoute;
