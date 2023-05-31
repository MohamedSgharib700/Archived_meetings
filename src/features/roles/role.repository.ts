import { roleDto } from "./role.dto";
import { Role } from "../../models";
// import { Permission } from "../permissions/models/permission.model";
import { Permission } from "../../models";

const getAllRolesRepo = async (): Promise<object> => {
  const roles = await Role.findAll({
    include: { model: Permission, as: "permissions" },
  });
  return roles;
};

const createRoleRepo = async (data: any): Promise<object> => {
  const role = await Role.create(roleDto(data));

  // get permissions of body`s ids
  const permissionsToAdd = await Permission.findAll({
    where: { id: data.permission_id },
  });

  // add permissions to role
  await role.addPermissions(permissionsToAdd);
  return role.reload({ include: { model: Permission, as: "permissions" } });
};

const showRoleRepo = async (id: string): Promise<object | null> => {
  const role = await Role.findByPk(id);
  return role;
};

// FIXME:: refacte this method
//TODO:: use transaction database
const updateRoleRepo = async (data: any, id: string): Promise<Role | null> => {
  // get the role by id
  const role = await Role.findOne({ where: { id } });

  // get permissions of role
  const permissionsToRemove = await role?.getPermissions();

  // remove these permissions from pivot table
  await role?.removePermissions(permissionsToRemove);

  // get permissions of body`s category_ids
  const permissionsToAdd = await Permission.findAll({
    where: { id: data["permission_id"] },
  });

  // add permissions to role
  await role?.addPermissions(permissionsToAdd);

  // update role data
  await role?.update(roleDto(data));

  return role;
};

const destroyRoleRepo = async (id: string) => {
  // get the role by id
  const role = await Role.findOne({ where: { id } });

  // get permissions of role
  const permissionsToRemove = await role?.getPermissions();

  // remove these permissions from pivot table
  await role?.removePermissions(permissionsToRemove);

  // delete this role
  Role.destroy({ where: { id } });
};

export {
  getAllRolesRepo,
  createRoleRepo,
  updateRoleRepo,
  showRoleRepo,
  destroyRoleRepo,
};
