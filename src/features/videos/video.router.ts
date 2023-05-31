import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {
  getAllVideos,
  createVideo,
  showVideo,
  updateVideo,
  destroyVideo,
} from "./video.controller";
import videoValidationSchema from "./video.validation";

const router = express.Router();

router
  .route("/")
  .get(getAllVideos)
  .post(validationMiddleware(videoValidationSchema), createVideo);

router
  .route("/:id")
  .get(showVideo)
  .put(validationMiddleware(videoValidationSchema), updateVideo)
  .delete(destroyVideo);

export default router;
