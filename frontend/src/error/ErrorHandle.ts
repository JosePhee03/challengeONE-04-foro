import { CustomError, CustomErrorCode } from "./CustomError";
import { UnauthorizedError } from "./UnauthorizedError";

export class ErrorHandler {
  static handle(errorCode: CustomErrorCode, message: string): CustomError {
    switch (errorCode) {
      case 400:
        return new CustomError(400, "La solicitud es incorrecta");
      case 401:
        return new UnauthorizedError(message);
      case 404:
        return new CustomError(404, "Recurso no encontrado");
      default:
        return new CustomError(500, "Error interno del servidor");
    }
  }
}
