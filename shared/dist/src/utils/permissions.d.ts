import { type Permission } from "../constants/roles";
import type { UserRole } from "../types/user";
export declare const hasPermission: (userRole: UserRole, requiredPermission: Permission) => boolean;
export declare const hasAnyPermission: (userRole: UserRole, requiredPermissions: Permission[]) => boolean;
export declare const hasAllPermissions: (userRole: UserRole, requiredPermissions: Permission[]) => boolean;
export declare const getAvailablePermissions: (userRole: UserRole) => Permission[];
export declare const isAdmin: (userRole: UserRole) => boolean;
export declare const isLandlord: (userRole: UserRole) => boolean;
export declare const isTenant: (userRole: UserRole) => boolean;
