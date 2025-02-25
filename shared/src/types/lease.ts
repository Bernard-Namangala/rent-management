export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  TERMINATED = "TERMINATED",
}

export interface Lease {
  id: string;
  unitId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  status: LeaseStatus;
  monthlyRent: number;
  securityDeposit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaseCreateInput {
  unitId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
}

export interface LeaseUpdateInput {
  startDate?: Date;
  endDate?: Date;
  status?: LeaseStatus;
  monthlyRent?: number;
  securityDeposit?: number;
}
