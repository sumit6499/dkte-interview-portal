import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.Role);
  console.log("role is ",userRole)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!allowedRoles.includes(userRole)) {
      navigate("/error");
    }
  }, [isAuthenticated, userRole, allowedRoles, navigate]);

  return isAuthenticated && allowedRoles.includes(userRole) ? element : null;
};
export default PrivateRoute;