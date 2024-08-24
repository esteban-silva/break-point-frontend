import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  return { user, setUser, isAuthenticated, setIsAuthenticated };
};
