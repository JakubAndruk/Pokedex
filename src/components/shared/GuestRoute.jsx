import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const GuestRoute = () => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/home" /> : <Outlet />;
};
