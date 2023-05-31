import { Request, Response } from "express";
import catchAsync from "../../shared/catch-async";
import { returnedResponse } from "../../shared/constants";
import {
  createRoleRepo,
  destroyRoleRepo,
  getAllRolesRepo,
  showRoleRepo,
  updateRoleRepo,
} from "./role.repository";

const getAllRoles = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const roles = await getAllRolesRepo();
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        roles,
      },
    });
  }
);

const createRole = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const role = await createRoleRepo(req.body);
    res.status(201).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        role,
      },
    });
  }
);

const showRole = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const role = await showRoleRepo(req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        role,
      },
    });
  }
);

const updateRole = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const role = await updateRoleRepo(req.body, req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        role,
      },
    });
  }
);

const destroyRole = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await destroyRoleRepo(req.params.id);
    res.status(204).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: null,
    });
  }
);

export { getAllRoles, createRole, showRole, updateRole, destroyRole };
