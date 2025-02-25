export type UserRole = "ADMIN" | "LANDLORD" | "TENANT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
