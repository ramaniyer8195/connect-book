import { ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  userId: string;
  isLoading: boolean;
  setAuth: (auth: boolean, userId: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
