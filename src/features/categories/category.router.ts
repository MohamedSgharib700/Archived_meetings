import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {
  getAllCategories,
  createCategory,
  showCategory,
  updateCategory,
  destroyCategory,
} from "./category.controller";
import categoryValidationSchema from "./category.validation";

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(validationMiddleware(categoryValidationSchema), createCategory);

router
  .route("/:id")
  .get(showCategory)
  .put(validationMiddleware(categoryValidationSchema), updateCategory)
  .delete(destroyCategory);

export default router;
