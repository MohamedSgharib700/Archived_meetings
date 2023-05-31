import express, { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import validationMiddleware from "../../middlewares/validation";
import {
  getAllUsers,
  storeUser,
  updateUser,
  showUser,
  destroyuser,
} from "./user.controller";
import {
  storeValidationSchemas,
  updateValidationSchema,
} from "./user.validation";

const router = express.Router();

router
  .route("/store")
  .post(
    validationMiddleware(storeValidationSchemas),
    authMiddleware,
    storeUser
  );

router.route("/all").get(authMiddleware, getAllUsers);
router
  .route("/update")
  .put(
    authMiddleware,
    validationMiddleware(updateValidationSchema),
    updateUser
  );

router.route("/show").get(authMiddleware, showUser);

router.route("/destroy").delete(authMiddleware, destroyuser);

export default router;
