import React, { createContext, useState, useEffect, useContext } from "react";
import userAccountService from "../service/userAccountService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking
  const [user, setUser] = useState(null);

  useEffect(() => {
    userAccountService
      .me()
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  const login = async (data) => {
    // perform login then refresh user info
    await userAccountService.login(data);
    try {
      const res = await userAccountService.me();
      setIsLoggedIn(true);
      setUser(res.data);
      return res;
    } catch (err) {
      // if me() fails after login (shouldn't happen), mark logged in false?
      setIsLoggedIn(false);
      setUser(null);
      throw err;
    }
  };

  const logout = async () => {
    await userAccountService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
