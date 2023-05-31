import { NextFunction, Request, Response } from "express";
import AppError from "../../shared/app-error";

export const can = (permission: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.permissions.includes(permission)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
