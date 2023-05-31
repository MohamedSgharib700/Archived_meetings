import { videoDto } from "./video.dto";
import { Video } from "./models/video.model";
import { Category } from "../categories/models/category.model";
import catchAsync from "../../shared/catch-async";

const getAllVideosRepo = catchAsync(async (): Promise<object> => {
  const videos = await Video.findAll({
    include: { model: Category, as: "categories" },
  });
  return videos;
});

const createVideoRepo = catchAsync(async (data: any): Promise<Video | void> => {
  // create a video
  const video = await Video.create(videoDto(data));

  // get categories of body`s ids
  const categoriesToAdd = await Category.findAll({
    where: { id: data["category_id"] },
  });

  // add categories to video
  await video.addCategories(categoriesToAdd);
  return video.reload({ include: { model: Category, as: "categories" } });
});

const showVideoRepo = catchAsync(async (id: string): Promise<Video | null> => {
  const video = await Video.findByPk(id, {
    include: { model: Category, as: "categories" },
  });
  return video;
});

// FIXME:: refacte this method
//TODO:: use transaction database
const updateVideoRepo = catchAsync(
  async (data: any, id: string): Promise<Video | null> => {
    // get the video by id
    const video = await Video.findOne({ where: { id } });

    // get categories of video
    const categoriesToRemove = await video?.getCategories();

    // remove these categories from pivot table
    await video?.removeCategories(categoriesToRemove);

    // get categories of body`s category_ids
    const categoriesToAdd = await Category.findAll({
      where: { id: data["category_id"] },
    });

    // add categories to video
    await video?.addCategories(categoriesToAdd);

    // update video data
    await video?.update(videoDto(data));

    return video;
  }
);

const destroyVideoRepo = catchAsync(async (id: string) => {
  // get the video by id
  const video = await Video.findOne({ where: { id } });

  // get categories of video
  const categoriesToRemove = await video?.getCategories();

  // remove these categories from pivot table
  await video?.removeCategories(categoriesToRemove);

  // delete this video
  Video.destroy({ where: { id } });
});

export {
  getAllVideosRepo,
  createVideoRepo,
  updateVideoRepo,
  showVideoRepo,
  destroyVideoRepo,
};
