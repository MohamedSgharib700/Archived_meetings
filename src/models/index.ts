import { PermissionRole } from "../features/permissions/models/permission-role.model";
import { Permission } from "../features/permissions/models/permission.model";
import { RoleUser } from "../features/roles/models/role-user.model";
import Role from "../features/roles/models/role.model";
import User from "../features/users/models/user.model";

Permission.belongsToMany(Role, {
  as: "roles",
  through: PermissionRole,
});

Role.belongsToMany(Permission, {
  as: "permissions",
  through: PermissionRole,
});

Role.belongsToMany(User, {
  as: "users",
  through: RoleUser,
});

User.belongsToMany(Role, {
  as: "roles",
  through: RoleUser,
});

export { Permission, Role, User };
