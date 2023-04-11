import { Button } from "@mui/material";
import React, { useContext } from "react";
import AuthApi from "../../utils/authApi";
import { login } from "../../utils/axiosApi";
import axios from "axios";

const LoginPage: React.FC = () => {
  const authApi = useContext(AuthApi);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await login({
      username: "nikithasuresh",
      password: "Nikki@97",
    });

    if (axios.isAxiosError(res)) {
      authApi?.setAuth(false);
    } else {
      authApi?.setAuth(true);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
};

export default LoginPage;
