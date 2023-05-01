import { Button } from "@mui/material";
import React, { useContext, FC } from "react";
import axios from "axios";

import { AuthContext } from "../../setup/auth/auth";
import { login } from "../../setup/api/axios";
import { LoginUserResponse } from "./login.interface";

const LoginPage: FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await login({
      username: "nikithasuresh",
      password: "Nikki@97",
    });

    const loginResponse = res as LoginUserResponse;

    if (axios.isAxiosError(res)) {
      authContext.setAuth(false, "");
    } else {
      authContext.setAuth(true, loginResponse._id);
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
