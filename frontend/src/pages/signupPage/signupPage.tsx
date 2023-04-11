import { Button } from "@mui/material";
import React, { useContext } from "react";
import AuthApi from "../../utils/authApi";
import { singup } from "../../utils/axiosApi";
import axios from "axios";

const SignupPage: React.FC = () => {
  const authApi = useContext(AuthApi);

  const handleSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await singup({
      name: "Raman Iyer",
      phone: "91-9819289445",
      emailId: "ramaniyer8195@gmail.com",
      username: "ramaniyer",
      password: "Raman@95",
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
        <h1>Signup</h1>
        <Button onClick={handleSignup}>Signup</Button>
      </div>
    </>
  );
};

export default SignupPage;
