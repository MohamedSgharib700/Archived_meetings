import { returnedResponse } from "../constants";

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? returnedResponse.FAIL_RESPONSE_STATUS
      : returnedResponse.ERROR_RESPONSE_STATUS;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
