import { Button } from "@mui/material";
import React, { useContext } from "react";
import { logout } from "../../utils/axiosApi";
import AuthApi from "../../utils/authApi";

const Dashboard: React.FC = () => {
  const authApi = useContext(AuthApi);

  const handleLogout = async () => {
    await logout();
    authApi?.setAuth(false);
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
