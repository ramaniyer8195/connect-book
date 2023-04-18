import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import AuthContext from "setup/auth/authApi";
import AppRoutes from "setup/routes/AppRoutes";
import { AuthUser } from "common/common.interface";
import { getAuthUser } from "setup/api/axios";

import "./App.css";

const App: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState("");

  const readSession = async () => {
    const res = await getAuthUser();
    if (axios.isAxiosError(res)) {
      setAuth(false);
      setUserId("");
    } else {
      const { _id } = res as AuthUser;
      setAuth(true);
      setUserId(_id);
    }
  };

  useEffect(() => {
    readSession();
  }, [auth]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth, userId, setUserId }}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
