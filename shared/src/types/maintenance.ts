export enum MaintenanceStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum MaintenancePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  EMERGENCY = "EMERGENCY",
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  unitId: string;
  tenantId: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface MaintenanceRequestCreateInput {
  title: string;
  description: string;
  unitId: string;
  priority: MaintenancePriority;
}

export interface MaintenanceRequestUpdateInput {
  title?: string;
  description?: string;
  status?: MaintenanceStatus;
  priority?: MaintenancePriority;
  completedAt?: Date;
}
