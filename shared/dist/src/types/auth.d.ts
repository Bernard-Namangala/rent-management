export interface LoginInput {
    email: string;
    password: string;
}
export interface RegisterInput {
    email: string;
    password: string;
    name: string;
    role: "LANDLORD" | "TENANT";
}
export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}
export interface PasswordResetInput {
    email: string;
}
export interface PasswordUpdateInput {
    oldPassword: string;
    newPassword: string;
}
