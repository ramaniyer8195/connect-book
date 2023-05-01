import { Button } from "@mui/material";
import React, { useContext } from "react";

import { AuthContext } from "../../setup/auth/auth";
import { logout } from "../../setup/api/axios";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    authContext.setAuth(false, "");
  };

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </>
  );
};

export default Dashboard;
