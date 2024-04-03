import { Response, Request, NextFunction } from "express";
import { AppError } from "../AppError";
import { ZodError } from "zod";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode;
  if (err instanceof AppError) statusCode = err.statusCode;
  else if (err instanceof ZodError) statusCode = 400;
  else statusCode = 500;

  res.status(statusCode);
  res.json({
    errors: err instanceof ZodError ? err.format() : err.message,
  });
}
