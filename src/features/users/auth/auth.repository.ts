import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../../../shared/catch-async";
import { signupDto } from "./auth.dto";
import AppError from "../../../shared/app-error";
import { Role, Permission, User } from "../../../models";
import { returnedResponse } from "../../../shared/constants";

const signToken = (id: number | undefined) => {
  return jwt.sign({ id }, "secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (
  user: User,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string, 10) *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  //FIXME:: Remove password from output
  // user.password = null;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signUpRepo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const data = signupDto(req.body);
    const user = await User.create(data);

    // get roles of body`s role_ids
    const rolesToAdd = await Role.findAll({
      where: { id: data["role_id"] },
    });

    // add roles to user
    await user?.addRoles(rolesToAdd);
    await user.reload({ include: { model: Role, as: "roles" } });
    createSendToken(user, 201, res);
  }
);

const signInRepo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    // 2) Check if user exists && password is correct
    const user: any = await User.findOne({ where: { email } });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  }
);

const updatePasswordRepo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1) Get logged user
    const { user } = req;

    // 2) Check if POSTed current password is correct
    const { currentPassword, password, passwordConfirm } = req.body;
    if (!user.correctPassword(currentPassword, user.password)) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    await user.update({ password, passwordConfirm });

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  }
);

const profileRepo = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    status: returnedResponse.SUCCESS_RESPONSE_STATUS,
    data: {
      user: req.user,
    },
  });
});

export { signUpRepo, signInRepo, updatePasswordRepo, profileRepo };
