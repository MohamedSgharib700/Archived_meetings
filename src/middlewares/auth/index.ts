// TODO:: translate all errors
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppError from "../../shared/app-error";
import catchAsync from "../../shared/catch-async";
import User from "../../features/users/models/user.model";
import { Permission, Role } from "../../models";

const getUserPermissions = async (user: User): Promise<Array<string>> => {
  const permissions = user.roles.flatMap((role) =>
    role.permissions.map((permission) => permission.name)
  );
  return permissions;
};

const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // FIXME:: put secret key in env.
    // 2) Verification token
    const { id, iat } = jwt.verify(token, "secret-key") as JwtPayload;

    // 3) Check if user still exists
    const currentUser = await User.findByPk(id, {
      include: [
        {
          as: "roles",
          model: Role,
          include: [
            {
              as: "permissions",
              model: Permission,
              through: { attributes: [] }, // Exclude join table attributes
            },
          ],
        },
      ],
    });

    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(iat!)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    req.user.permissions = await getUserPermissions(currentUser);

    next();
  }
);

export default authMiddleware;
