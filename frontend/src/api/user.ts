import { AuthUser } from "./api";

export const createUser = async (user: AuthUser, token: string) => {

  return await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/user`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(user)
  }).then(data => {
    console.log(data)
    return data.json();
  }).then(response => {
    console.log(response);
  }).catch(e => {
    console.log(e);
  });

}
