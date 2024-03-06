import { ErrorHandler } from "../error/ErrorHandle";
import { ErrorResponse } from "./api";

export function fetchApi<T>(fnFetch: () => Promise<Response>) {
  return fnFetch()
    .then(response => response.json())
    .then(data => data as T)
    .catch(data => {
      const { status, message } = data as ErrorResponse
      throw ErrorHandler.handle(status, message)
    })
}