import { createContext } from "react";
import {IUser} from "../../types/IUser";

export interface IAuthContext {
  user: IUser;
  setUser: (user: IUser) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
} as unknown as IAuthContext);
