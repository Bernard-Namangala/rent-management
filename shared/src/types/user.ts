export enum UserRole {
  ADMIN = "ADMIN",
  LANDLORD = "LANDLORD",
  TENANT = "TENANT",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UserUpdateInput {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
}
