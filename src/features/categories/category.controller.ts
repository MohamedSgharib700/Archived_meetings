import { Request, Response } from "express";
import catchAsync from "../../shared/catch-async";
import { returnedResponse } from "../../shared/constants";
import {
  createCategoryRepo,
  destroyCategoryRepo,
  getAllCategoriesRepo,
  showCategoryRepo,
  updateCategoryRepo,
} from "./category.repository";

const getAllCategories = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const categories = await getAllCategoriesRepo();
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        categories,
      },
    });
  }
);

const createCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const category = await createCategoryRepo(req.body);
    res.status(201).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        category,
      },
    });
  }
);

const showCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const category = await showCategoryRepo(req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        category,
      },
    });
  }
);

const updateCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const category = await updateCategoryRepo(req.body, req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        category,
      },
    });
  }
);

const destroyCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await destroyCategoryRepo(req.params.id);
    res.status(204).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: null,
    });
  }
);

export {
  getAllCategories,
  createCategory,
  showCategory,
  updateCategory,
  destroyCategory,
};
