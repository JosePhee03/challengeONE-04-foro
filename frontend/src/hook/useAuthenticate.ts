import { useEffect, useState } from "preact/hooks";
import { AuthUser } from "../api/api";
import { getTokenAPI, isTokenExpired } from "../api/token";
import { route } from "preact-router";
import { userStore } from "../store/userStore";

const TOKEN_STORAGE = "token";

export const setTokenStorage = (token: string) => {
  return localStorage.setItem(TOKEN_STORAGE, token);
};

export const getTokenStorage = () => {
  const token = localStorage.getItem(TOKEN_STORAGE);
  return token;
};

const authToken = (): boolean => {
  return isTokenExpired();
};

export function useAuthenticate() {
  const [isAuthenticated, setIsAuthenticated] = useState(authToken);

  const login = async (user: AuthUser) => {
    try {
      const response = await getTokenAPI(user);
      if (response.jwt === undefined) return Promise.reject();
      setTokenStorage(response.jwt);
      setIsAuthenticated(true);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      userStore.getState().fetchUser();
    }
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE);
    setIsAuthenticated(false);
    userStore.getState().resetUser();
    route("/login", false);
  };

  return {
    isAuthenticated,
    authToken,
    logout,
    login,
  };
}
