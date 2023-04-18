import { createContext } from "react";
import type { AuthApiContext } from "./authApi.interface";

export default createContext<AuthApiContext | null>(null);
