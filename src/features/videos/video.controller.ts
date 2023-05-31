import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catch-async";
import { returnedResponse } from "../../shared/constants";
import {
  createVideoRepo,
  destroyVideoRepo,
  getAllVideosRepo,
  showVideoRepo,
  updateVideoRepo,
} from "./video.repository";

const getAllVideos = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const videos = await getAllVideosRepo();

    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        videos,
      },
    });
  }
);

const createVideo = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const video = await createVideoRepo(req.body, next);
    res.status(201).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        video,
      },
    });
  }
);

const showVideo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const video: object = await showVideoRepo(req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        video,
      },
    });
  }
);

const updateVideo = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const video = await updateVideoRepo(req.body, req.params.id);
    res.status(200).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: {
        video,
      },
    });
  }
);

const destroyVideo = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await destroyVideoRepo(req.params.id);
    res.status(204).json({
      status: returnedResponse.SUCCESS_RESPONSE_STATUS,
      data: null,
    });
  }
);

export { getAllVideos, createVideo, showVideo, updateVideo, destroyVideo };
