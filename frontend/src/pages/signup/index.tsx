import { Button } from "@mui/material";
import React, { useContext, FC } from "react";
import axios from "axios";

import { AuthContext } from "../../setup/auth/auth";
import { singup } from "../../setup/api/axios";
import { SignupUserResponse } from "./signup.interface";

const SignupPage: FC = () => {
  const authContext = useContext(AuthContext);

  const handleSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await singup({
      name: "Raman Iyer",
      phone: "91-9819289445",
      emailId: "ramaniyer8195@gmail.com",
      username: "ramaniyer",
      password: "Raman@95",
    });

    const newUser = res as SignupUserResponse;

    if (axios.isAxiosError(res)) {
      authContext.setAuth(false, "");
    } else {
      authContext.setAuth(true, newUser._id);
    }
  };

  return (
    <>
      <div>
        <h1>Signup</h1>
        <Button onClick={handleSignup}>Signup</Button>
      </div>
    </>
  );
};

export default SignupPage;
