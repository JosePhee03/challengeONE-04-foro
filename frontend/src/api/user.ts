import { AuthUser } from "./api";

export const createUser = async (user: AuthUser) => {
  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => {
    if (!data.ok) return Promise.reject();
    return data.json();
  });
};

export const findUser = async (token: string | null, userId: number) => {
  return await fetch(
    `${import.meta.env.VITE_DATABASE_URL}/api/user/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => {
    if (!data.ok) return Promise.reject(data);
    return data.json() as unknown;
  });
};
