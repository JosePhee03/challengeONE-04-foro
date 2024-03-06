import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {

  constructor(message: string) {
    const code = 401
    super(code, message)
  }
}