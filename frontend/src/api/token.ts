import { AuthUser, tokenResponse } from "./api"
import { fetchApi } from "./fetchApi"



export const authToken = (user: AuthUser) => {

  const fetching = fetch(`${import.meta.env.VITE_DATABASE_URL}/api/auth`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }).then(response => response.json())
    .then(data => data as tokenResponse)
    .catch(data => {
      const { status, message } = data as ErrorResponse
      throw ErrorHandler.handle(status, message)
    })

}