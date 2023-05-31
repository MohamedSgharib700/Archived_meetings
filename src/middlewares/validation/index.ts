import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import AppError from "../../shared/app-error";

const validationMiddleware = (validationSchema: Joi.ObjectSchema): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationSchema.validate(req.body);
    const valid = error == null;

    if (valid) {
      return next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      return next(new AppError(message, 422));
    }
  };
};

export default validationMiddleware;
