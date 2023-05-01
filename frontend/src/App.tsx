import { BrowserRouter as Router } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";

import { AuthProvider } from "./setup/auth/auth";
import AppRoutes from "./setup/routes/AppRoutes";
import Navbar from "./common/navbar";

import "./App.css";

const App: React.FC = () => {
  return (
    <Box height="100vh">
      <AuthProvider>
        <Router>
          <Navbar />
          <Toolbar />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </Box>
  );
};

export default App;
