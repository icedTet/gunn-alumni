import { PublicUser } from "../types/user";
const minimumPermissionRequired = {
  webmaster: 0,
  admin: 1,
  classpresident: 2,
  sec: 3,
};
const permissionList = {
  viewAdminPanel: 0,
  manageClass: 1,
};
export const hasPermission = (
  user: PublicUser,
  permission: keyof typeof permissionList
) => {
  const permissionLevel = permissionList[permission];
  if (permissionLevel === undefined) {
    throw new Error("Invalid permission");
  }
  const userPermissionLevel =
    user.tags
      ?.map((tag) => minimumPermissionRequired[tag])
      .reduce((a, b) => Math.min(a, b)) ?? 4;
  return userPermissionLevel <= permissionLevel;
};
