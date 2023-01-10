import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ErrorScreen from "../screens/ErrorScreen";
import CompanyListScreen from "../screens/CompanyListScreen";
import ProtectedRoutes from "./ProtectedRoutes";
import SideBar from "../components/SideBar";

export default function AllRoutes() {
  const [showNavBar, setShowNavBar] = useState<boolean>();
  const Location = useLocation();

  useEffect(() => {
    if (Location.pathname === "/" || Location.pathname === "/register") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  });
  return (
    <>
      {showNavBar && <SideBar />}
      <Routes location={Location} key={Location.pathname}>
        <Route path="/" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardScreen />}></Route>
          <Route path="/company-list" element={<CompanyListScreen />}></Route>
          <Route path="/weekly-tasks" element={<h1>weekly tasks</h1>}></Route>
          <Route path="/interview" element={<h1>interview</h1>}></Route>
          <Route path="/contact" element={<h1>contanct info</h1>}></Route>
          <Route path="/profile" element={<h1>profile</h1>}></Route>
        </Route>
        <Route path="/*" element={<ErrorScreen />}></Route>
      </Routes>
    </>
  );
}
