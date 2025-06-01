import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as HttpError).statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    errorStack : process.env.NODE_ENV === 'development' ?err.stack : null
  });
};
