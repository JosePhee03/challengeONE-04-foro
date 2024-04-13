import { useState } from "preact/hooks";
import { AuthUser } from "../api/api";

const TOKEN_STORAGE = "token";

export const getTokenStorage = () => {
  return;
};

export const setTokenStorage = (token: string) => {
  return localStorage.setItem(TOKEN_STORAGE, token);
};

export function useToken() {
  const [token, setToken] = useState();

  const login = (user: AuthUser) => {
    return user;
  };

  return {
    token,
    login,
    setToken,
  };
}
