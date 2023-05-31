import sequelize from "../../../configs/DB/sequelize";
import {
  DataTypes,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  Model,
} from "sequelize";
// import { RoleUser } from "./role-user.model";
import { Permission } from "../../../models";

class Role extends Model {
  declare addPermissions: HasManyAddAssociationsMixin<
    Permission,
    Array<object>
  >;
  declare getPermissions: HasManyGetAssociationsMixin<Permission>;
  declare removePermissions: HasManyRemoveAssociationsMixin<
    Permission,
    Permission
  >;

  id!: number | string;
  name!: string;
  permissions!: Permission[];
}

Role.init(
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
    tableName: "roles",
  }
);

export default Role;
