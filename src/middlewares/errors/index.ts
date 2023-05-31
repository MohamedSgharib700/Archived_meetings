//TODO::use il8n transaltion in this file
import { NextFunction, Request, Response } from "express";
import AppError from "../../shared/app-error";
import { returnedResponse } from "../../shared/constants";
import { Link } from "swagger-jsdoc";

const handleCastErrorDB = (err: Error | any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const SequelizeDatabaseError = (err: Error | any) => {
  return new AppError(err.message, err.error?.statusCode);
};

const handleValidationErrorDB = (err: Error) => {
  const errors = Object.values(err).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: returnedResponse.ERROR_RESPONSE_STATUS,
      message: "Something went very wrong!",
    });
  }
};

export default (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || returnedResponse.ERROR_RESPONSE_STATUS;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error: Error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "SequelizeDatabaseError")
      error = SequelizeDatabaseError(err);

    sendErrorProd(err, res);
  }
};
