import AllRoutes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AllRoutes />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
