import axios from "axios";
import { LoginUserBody, SignupUserBody } from "./axios.interface";

export const login = async (loginUser: LoginUserBody) => {
  try {
    const res = await axios.post("/api/users/login", loginUser);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const singup = async (singupUser: SignupUserBody) => {
  try {
    const res = await axios.post("/api/users/signup", singupUser);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axios.get("/api/users/getAuthUser");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post("/api/users/logout");
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
