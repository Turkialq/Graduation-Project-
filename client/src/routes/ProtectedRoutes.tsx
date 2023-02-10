import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  return sessionStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/" />;
}
