import { useState, useEffect, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ErrorScreen from "../screens/ErrorScreen";
import CompanyListScreen from "../screens/CompanyListScreen";
import WeeklyTasks from "../screens/WeeklyTasks";
import ProtectedRoutes from "./ProtectedRoutes";
import SideBar from "../components/SideBar";
import TaskPreview from "../screens/TaskPreview";
import InterView from "../screens/InterView";
import StudentSubmitionList from "../screens/StudentSubmitions";

//lazy loading to increase preformance
const DashboardScreen = lazy(() => import("../screens/DashboardScreen"));

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
          <Route path="/weekly-tasks" element={<WeeklyTasks />}></Route>
          <Route path="/interview" element={<InterView />}></Route>
          <Route path="/contact" element={<h1>contanct info</h1>}></Route>
          <Route path="/profile" element={<h1>profile</h1>}></Route>
          <Route path="/task-preview" element={<TaskPreview />}></Route>

          <Route
            path="/student-submitions"
            element={<StudentSubmitionList />}
          ></Route>
        </Route>
        <Route path="/*" element={<ErrorScreen />}></Route>
      </Routes>
    </>
  );
}
