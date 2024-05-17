import { getTokenStorage } from "../hook/useAuthenticate";
import { AuthUser, TokenPayload } from "./api";

export const getTokenAPI = async (user: AuthUser) => {
  return fetch(`${import.meta.env.VITE_DATABASE_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => {
    return data.json();
  });
};

export const getTokenPayload = (): TokenPayload | null => {
  const token = getTokenStorage();
  if (token === null) return null;
  return JSON.parse(atob(token.split(".")[1])) as TokenPayload;
};

export const isTokenExpired = () => {
  const payload = getTokenPayload();
  if (payload === null) return false;
  return Math.floor(new Date().getTime() / 1000) <= payload.exp;
};
