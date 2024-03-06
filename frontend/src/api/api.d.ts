
export interface User {
  id: number,
  username: string,
}

export interface AuthUser {
  username: string
  password: string
}

export interface ErrorResponse {
  error: string
  message: string
  path: string
  status: number
  timestamp: string
}

interface tokenResponse {
  jwt: string
}