import React from "react";
import Button from "@mui/material/Button";
import AllRoutes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AllRoutes />
      </Router>
    </>
  );
}

export default App;
