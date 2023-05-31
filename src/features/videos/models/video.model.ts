import {
  DataTypes,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
} from "sequelize";
import markdownIt from "markdown-it";
import sequelize from "../../../configs/DB/sequelize";
import { Category } from "../../categories/models/category.model";

class Video extends Model {
  declare addCategories: HasManyAddAssociationsMixin<Category, Array<object>>;
  declare getCategories: HasManyGetAssociationsMixin<Category>;
  declare setCategories: HasManySetAssociationsMixin<Category, Array<object>>;
  declare removeCategories: HasManyRemoveAssociationsMixin<Category, Category>;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const md = new markdownIt();
        return md.render(this.getDataValue("description"));
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "videos",
    modelName: "Video",
  }
);

export { Video };
