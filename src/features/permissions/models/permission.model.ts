import sequelize from "../../../configs/DB/sequelize";
import { DataTypes, Model } from "sequelize";

class Permission extends Model {
  id!: number;
  name!: string;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
  }
);

export { Permission };
