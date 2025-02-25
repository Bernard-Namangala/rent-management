export declare const ROLES: {
    readonly ADMIN: "ADMIN";
    readonly LANDLORD: "LANDLORD";
    readonly TENANT: "TENANT";
};
export type Permission = "*" | "property:read" | "property:write" | "unit:read" | "unit:write" | "tenant:read" | "tenant:write" | "lease:read" | "lease:write" | "maintenance:read" | "maintenance:write" | "payment:read" | "payment:write";
export declare const ROLE_PERMISSIONS: Record<keyof typeof ROLES, Permission[]>;
