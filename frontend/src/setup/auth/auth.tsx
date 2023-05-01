import React, { createContext, useState, FC, useEffect } from "react";
import type { AuthContextType, AuthProviderProps } from "./auth.interface";
import { getAuthUser } from "../api/axios";
import axios from "axios";
import { AuthUser } from "../../common/common.interface";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: "",
  isLoading: false,
  setAuth: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const readSession = async () => {
    const res = await getAuthUser();
    if (axios.isAxiosError(res)) {
      setIsAuthenticated(false);
      setUserId("");
    } else {
      const { _id } = res as AuthUser;
      setIsAuthenticated(true);
      setUserId(_id);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    readSession();
  }, [isAuthenticated]);

  const setAuth = (auth: boolean, userId: string) => {
    setIsAuthenticated(auth);
    setUserId(userId);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, isLoading, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
