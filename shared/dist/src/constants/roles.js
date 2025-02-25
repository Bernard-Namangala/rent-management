"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.ROLES = void 0;
exports.ROLES = {
    ADMIN: "ADMIN",
    LANDLORD: "LANDLORD",
    TENANT: "TENANT",
};
exports.ROLE_PERMISSIONS = {
    ADMIN: ["*"],
    LANDLORD: [
        "property:read",
        "property:write",
        "unit:read",
        "unit:write",
        "tenant:read",
        "tenant:write",
        "lease:read",
        "lease:write",
        "maintenance:read",
        "maintenance:write",
        "payment:read",
        "payment:write",
    ],
    TENANT: [
        "property:read",
        "unit:read",
        "lease:read",
        "maintenance:read",
        "maintenance:write",
        "payment:read",
        "payment:write",
    ],
};
//# sourceMappingURL=roles.js.map