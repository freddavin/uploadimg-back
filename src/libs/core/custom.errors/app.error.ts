import { ErrorCode, HttpStatusCode } from '..';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string = ErrorCode.INTERNAL_SERVER_ERROR,
    public statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
