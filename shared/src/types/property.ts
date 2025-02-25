export interface Property {
  id: string;
  name: string;
  address: string;
  description?: string;
  landlordId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyCreateInput {
  name: string;
  address: string;
  description?: string;
}

export interface PropertyUpdateInput {
  name?: string;
  address?: string;
  description?: string;
}
