"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTenant = exports.isLandlord = exports.isAdmin = exports.getAvailablePermissions = exports.hasAllPermissions = exports.hasAnyPermission = exports.hasPermission = void 0;
const roles_1 = require("../constants/roles");
const hasPermission = (userRole, requiredPermission) => {
    const permissions = roles_1.ROLE_PERMISSIONS[userRole];
    // Admin has all permissions
    if (userRole === roles_1.ROLES.ADMIN || permissions.includes("*"))
        return true;
    return permissions.includes(requiredPermission);
};
exports.hasPermission = hasPermission;
const hasAnyPermission = (userRole, requiredPermissions) => {
    return requiredPermissions.some((permission) => (0, exports.hasPermission)(userRole, permission));
};
exports.hasAnyPermission = hasAnyPermission;
const hasAllPermissions = (userRole, requiredPermissions) => {
    return requiredPermissions.every((permission) => (0, exports.hasPermission)(userRole, permission));
};
exports.hasAllPermissions = hasAllPermissions;
const getAvailablePermissions = (userRole) => {
    return [...roles_1.ROLE_PERMISSIONS[userRole]];
};
exports.getAvailablePermissions = getAvailablePermissions;
const isAdmin = (userRole) => {
    return userRole === roles_1.ROLES.ADMIN;
};
exports.isAdmin = isAdmin;
const isLandlord = (userRole) => {
    return userRole === roles_1.ROLES.LANDLORD;
};
exports.isLandlord = isLandlord;
const isTenant = (userRole) => {
    return userRole === roles_1.ROLES.TENANT;
};
exports.isTenant = isTenant;
//# sourceMappingURL=permissions.js.map