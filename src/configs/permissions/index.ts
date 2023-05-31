import * as fs from "fs";

const createPermissionsArray = (
  name: string,
  except: string[],
  exstra: string[]
) => {
  let cases = ["list", "create", "update", "delete"];

  if (exstra && exstra.length) {
    cases = [...cases, ...exstra];
  }

  const permissions = cases
    .map((permission) => {
      if (!except.includes(permission)) {
        return { name: `${permission}-${name}` };
      }
    })
    .filter((element) => element !== undefined);

  return permissions;
};

const getPermissions = () => {
  const permissionData = fs.readFileSync(
    __dirname + "/permissions.json",
    "utf8"
  );
  const permissions = JSON.parse(permissionData);

  let permissionArray: any[] = [];
  for (const item of permissions) {
    const newPermissionArray = createPermissionsArray(
      item.name,
      item.except,
      item.exstra
    );
    permissionArray = [...permissionArray, ...newPermissionArray];
  }
  console.log(permissionArray);

  return permissionArray;
};

export { getPermissions };
