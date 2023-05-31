import { Request, Response } from "express";
import catchAsync from "../../shared/catch-async";
import { returnedResponse } from "../../shared/constants";
import {
  getAllUsersRepo,
  storeUserRepo,
  updateuserRepo,
  showUserRepo,
  destroyUserRepo,
} from "./user.repository";

const getAllUsers = catchAsync(async (res: Response): Promise<void> => {
  const users = await getAllUsersRepo();
  res.status(200).json({
    status: returnedResponse.SUCCESS_RESPONSE_STATUS,
    data: {
      users,
    },
  });
});

const storeUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await storeUserRepo(req.body);
    res.status(201).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        user,
      },
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await updateuserRepo(req.body, req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        user,
      },
    });
  }
);

const showUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await showUserRepo(req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        user,
      },
    });
  }
);

const destroyuser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await destroyUserRepo(req.params.id);
    res.status(204).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: null,
    });
  }
);

export { getAllUsers, storeUser, updateUser, showUser, destroyuser };
