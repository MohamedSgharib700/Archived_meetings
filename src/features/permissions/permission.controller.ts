import { Request, Response } from "express";
import catchAsync from "../../shared/catch-async";
import { returnedResponse } from "../../shared/constants";
import { getAllPermissionsRepo } from "./permission.repository";

const getAllPermissions = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const permissions = await getAllPermissionsRepo();
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        permissions,
      },
    });
  }
);

export { getAllPermissions };
