import { Permission } from "../../models";

const getAllPermissionsRepo = async (): Promise<object> => {
  const permissions = await Permission.findAll();
  return permissions;
};

export { getAllPermissionsRepo };
