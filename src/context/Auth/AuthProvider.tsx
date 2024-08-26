import React, { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "../../types/IUser";
import IApiResponse from "../../api/ApiManager/IApiResponse";
import ApiManager from "../../api/ApiManager/apiManager";
import { useHistory } from "react-router";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | undefined>();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const history = useHistory();
  const setUserLocal = (newUser: IUser) => {
    if (user?.email !== newUser.email) {
      setUser(newUser);
    }
  };

  const setIsAuthenticatedLocal = (newIsAuthenticated: boolean) => {
    setIsAuthenticated(newIsAuthenticated);
  };

  useEffect(() => {
    ApiManager.getCurrentSession().then((res: IApiResponse) => {
      if (res.status === 200) {
        setUser(res.data as IUser);
        setIsAuthenticated(true);
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
        history.push("/login");
      }
    });
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        user: user as IUser,
        setUser: setUserLocal,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticatedLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
