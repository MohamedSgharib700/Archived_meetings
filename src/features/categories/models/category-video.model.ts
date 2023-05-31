import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../../configs/DB/sequelize";

class CategoryVideo extends Model<
  InferAttributes<CategoryVideo>,
  InferCreationAttributes<CategoryVideo>
> {}

CategoryVideo.init(
  {},
  {
    sequelize,
    tableName: "category_video",
    modelName: "CategoryVideo",
  }
);

export { CategoryVideo };
