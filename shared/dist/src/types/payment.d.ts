export declare enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
export declare enum PaymentType {
    RENT = "RENT",
    DEPOSIT = "DEPOSIT",
    MAINTENANCE = "MAINTENANCE",
    LATE_FEE = "LATE_FEE",
    OTHER = "OTHER"
}
export interface Payment {
    id: string;
    amount: number;
    type: PaymentType;
    status: PaymentStatus;
    unitId: string;
    tenantId: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
}
export interface PaymentCreateInput {
    amount: number;
    type: PaymentType;
    unitId: string;
    tenantId: string;
    description?: string;
}
export interface PaymentUpdateInput {
    amount?: number;
    status?: PaymentStatus;
    description?: string;
}
