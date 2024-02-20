import { AppError } from '.';
import { ErrorCode, HttpStatusCode, ValidationError } from '..';
import { ErrorInfo } from './types';
import { ZodError } from 'zod';

export const getErrorInfo = (error: unknown): ErrorInfo => {
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: HttpStatusCode.BAD_REQUEST,
    };
  }

  if (error instanceof AppError || error instanceof ValidationError)
    return error;

  return {
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: error instanceof Error ? error.message : String(error),
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  };
};
