import { Model } from "sequelize";
import sequelize from "../../../configs/DB/sequelize";

class RoleUser extends Model {}

RoleUser.init(
  {},
  {
    sequelize,
    tableName: "user_has_roles",
    modelName: "RoleUser",
  }
);

export { RoleUser };
