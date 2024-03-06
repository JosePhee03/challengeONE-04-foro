export class CustomError extends Error {

  private code

  constructor(code: number, message: string) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }

}