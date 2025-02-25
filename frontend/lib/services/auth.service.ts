import {
  LoginCredentials as LoginInput,
  RegisterCredentials as RegisterInput,
  AuthResponse,
} from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class AuthService {
  static async register(data: RegisterInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to register");
    }

    const authData = await response.json();
    this.setSession(authData);
    return authData;
  }

  static async login(data: LoginInput): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to login");
    }

    const authData = await response.json();
    this.setSession(authData);
    return authData;
  }

  static setSession(data: AuthResponse): void {
    if (typeof window === "undefined") return;

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  static getSession(): AuthResponse | null {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) return null;

    return {
      accessToken: token,
      user: JSON.parse(user),
    };
  }

  static clearSession(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
