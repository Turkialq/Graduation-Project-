import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ErrorScreen from "../screens/ErrorScreen";
import ProtectedRoutes from "./ProtectedRoutes";

export default function AllRoutes() {
  const Location = useLocation();
  return (
    <>
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardScreen />}></Route>
        </Route>
        <Route path="/*" element={<ErrorScreen />}></Route>
      </Routes>
    </>
  );
}
