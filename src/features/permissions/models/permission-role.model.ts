import { Model } from "sequelize";
import sequelize from "../../../configs/DB/sequelize";

class PermissionRole extends Model {}

PermissionRole.init(
  {},
  {
    sequelize,
    tableName: "role_has_permissions",
    modelName: "PermissionRole",
  }
);

export { PermissionRole };
