"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaymentLate = exports.getDaysUntilDue = exports.calculateNextRentDue = exports.isLeaseExpired = exports.isLeaseActive = exports.formatDateTime = exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const formatDate = (date) => {
    return (0, date_fns_1.format)(date, "MMM dd, yyyy");
};
exports.formatDate = formatDate;
const formatDateTime = (date) => {
    return (0, date_fns_1.format)(date, "MMM dd, yyyy HH:mm");
};
exports.formatDateTime = formatDateTime;
const isLeaseActive = (startDate, endDate) => {
    const now = new Date();
    return !(0, date_fns_1.isBefore)(now, startDate) && !(0, date_fns_1.isAfter)(now, endDate);
};
exports.isLeaseActive = isLeaseActive;
const isLeaseExpired = (endDate) => {
    return (0, date_fns_1.isAfter)(new Date(), endDate);
};
exports.isLeaseExpired = isLeaseExpired;
const calculateNextRentDue = (startDate) => {
    const today = new Date();
    let nextDue = new Date(startDate);
    while ((0, date_fns_1.isBefore)(nextDue, today)) {
        nextDue = (0, date_fns_1.addMonths)(nextDue, 1);
    }
    return nextDue;
};
exports.calculateNextRentDue = calculateNextRentDue;
const getDaysUntilDue = (dueDate) => {
    return (0, date_fns_1.differenceInDays)(dueDate, new Date());
};
exports.getDaysUntilDue = getDaysUntilDue;
const isPaymentLate = (dueDate) => {
    return (0, date_fns_1.isAfter)(new Date(), (0, date_fns_1.addDays)(dueDate, 1)); // Grace period of 1 day
};
exports.isPaymentLate = isPaymentLate;
//# sourceMappingURL=date.js.map