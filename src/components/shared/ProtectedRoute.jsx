import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
