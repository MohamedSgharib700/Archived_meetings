import { NextFunction, Request, Response } from "express";

export default (fn: any): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};
