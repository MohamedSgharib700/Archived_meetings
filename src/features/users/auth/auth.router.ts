import express from "express";
import authMiddleware from "../../../middlewares/auth";
import validationMiddleware from "../../../middlewares/validation";
import { signUp, signIn, updatePassword, userProfile } from "./auth.controller";
import {
  updatePasswordValidationSchema,
  signUpValidationSchemas,
  signinValidationSchemas,
} from "./auth.validation";

const router = express.Router();

router.route("/sign-up").post(signUp);
router
  .route("/sign-in")
  .post(validationMiddleware(signinValidationSchemas), signIn);
router
  .route("/update-password")
  .patch(
    authMiddleware,
    validationMiddleware(updatePasswordValidationSchema),
    updatePassword
  );

router.route("/profile").get(authMiddleware, userProfile);

export default router;
