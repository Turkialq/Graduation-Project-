import AllRoutes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { SocketProvider } from "./context/SocketContext";

//#EFF5F5
const customTheme = createTheme({
  palette: {
    background: {
      default: "#EFF5F5",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider theme={customTheme}>
              <AllRoutes />
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
