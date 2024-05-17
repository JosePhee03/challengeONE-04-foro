export type CustomErrorCode = 400 | 401 | 404 | 500;

export class CustomError extends Error {
  private code;

  constructor(code: CustomErrorCode, message: string) {
    super(message);
    this.name = "CustomError";
    this.code = code;
  }

  public getCode(): CustomErrorCode {
    return this.code;
  }
}
