import sequelize from "../../../configs/DB/sequelize";
import { DataTypes, Model } from "sequelize";
import { Video } from "../../videos/models/video.model";
import { CategoryVideo } from "./category-video.model";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "categories",
    modelName: "Category",
  }
);

Video.belongsToMany(Category, {
  as: "categories",
  through: CategoryVideo,
  onDelete: "delete",
});
Category.belongsToMany(Video, { as: "categories", through: CategoryVideo });

export { Category };
