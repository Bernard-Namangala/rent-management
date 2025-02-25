export declare const formatDate: (date: Date) => string;
export declare const formatDateTime: (date: Date) => string;
export declare const isLeaseActive: (startDate: Date, endDate: Date) => boolean;
export declare const isLeaseExpired: (endDate: Date) => boolean;
export declare const calculateNextRentDue: (startDate: Date) => Date;
export declare const getDaysUntilDue: (dueDate: Date) => number;
export declare const isPaymentLate: (dueDate: Date) => boolean;
