import { ErrorCode, HttpStatusCode } from '..';

export class ValidationError extends Error {
  constructor(
    public message: string,
    public code: string = ErrorCode.VALIDATION_ERROR,
    public statusCode: number = HttpStatusCode.BAD_REQUEST
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
