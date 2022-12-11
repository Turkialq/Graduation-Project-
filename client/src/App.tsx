import React from "react";
import Button from "@mui/material/Button";
import AllRoutes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Button variant="contained">Hello GP project</Button>
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
