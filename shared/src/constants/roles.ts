export const ROLES = {
  ADMIN: "ADMIN",
  LANDLORD: "LANDLORD",
  TENANT: "TENANT",
} as const;

export type Permission =
  | "*"
  | "property:read"
  | "property:write"
  | "unit:read"
  | "unit:write"
  | "tenant:read"
  | "tenant:write"
  | "lease:read"
  | "lease:write"
  | "maintenance:read"
  | "maintenance:write"
  | "payment:read"
  | "payment:write";

export const ROLE_PERMISSIONS: Record<keyof typeof ROLES, Permission[]> = {
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
} as const;
