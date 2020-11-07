import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import AppError from './AppError';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    const errors: ValidationErrors = {};

    err.inner.forEach((error) => {
      errors[error.path] = error.errors;
    });

    return res.status(400).json({ message: 'Data validation fails', errors });
  }

  console.log(err); // eslint-disable-line

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorHandler;
