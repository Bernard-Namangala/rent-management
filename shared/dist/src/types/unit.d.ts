export declare enum UnitType {
    STUDIO = "STUDIO",
    APARTMENT = "APARTMENT",
    HOUSE = "HOUSE",
    ROOM = "ROOM"
}
export interface Unit {
    id: string;
    name: string;
    type: UnitType;
    propertyId: string;
    rent: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UnitCreateInput {
    name: string;
    type: UnitType;
    propertyId: string;
    rent: number;
    description?: string;
}
export interface UnitUpdateInput {
    name?: string;
    type?: UnitType;
    rent?: number;
    description?: string;
}
