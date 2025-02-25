import { ROLES, ROLE_PERMISSIONS, type Permission } from "../constants/roles";
import type { UserRole } from "../types/user";

export const hasPermission = (
  userRole: UserRole,
  requiredPermission: Permission
): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole];

  // Admin has all permissions
  if (userRole === ROLES.ADMIN || permissions.includes("*")) return true;

  return permissions.includes(requiredPermission);
};

export const hasAnyPermission = (
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.some((permission) =>
    hasPermission(userRole, permission)
  );
};

export const hasAllPermissions = (
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.every((permission) =>
    hasPermission(userRole, permission)
  );
};

export const getAvailablePermissions = (userRole: UserRole): Permission[] => {
  return [...ROLE_PERMISSIONS[userRole]];
};

export const isAdmin = (userRole: UserRole): boolean => {
  return userRole === ROLES.ADMIN;
};

export const isLandlord = (userRole: UserRole): boolean => {
  return userRole === ROLES.LANDLORD;
};

export const isTenant = (userRole: UserRole): boolean => {
  return userRole === ROLES.TENANT;
};
