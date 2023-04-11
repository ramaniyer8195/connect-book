import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "./utils/authApi";
import AppRoutes from "./Routes";
import axios from "axios";
import { getAuthUser } from "./utils/axiosApi";

const App: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  const readSession = async () => {
    const res = await getAuthUser();
    if (axios.isAxiosError(res)) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  };

  useEffect(() => {
    readSession();
  }, [auth]);

  return (
    <div className="app">
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthApi.Provider>
    </div>
  );
};

export default App;
