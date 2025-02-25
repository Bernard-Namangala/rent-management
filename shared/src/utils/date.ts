import {
  format,
  isAfter,
  isBefore,
  addMonths,
  addDays,
  differenceInDays,
} from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "MMM dd, yyyy");
};

export const formatDateTime = (date: Date): string => {
  return format(date, "MMM dd, yyyy HH:mm");
};

export const isLeaseActive = (startDate: Date, endDate: Date): boolean => {
  const now = new Date();
  return !isBefore(now, startDate) && !isAfter(now, endDate);
};

export const isLeaseExpired = (endDate: Date): boolean => {
  return isAfter(new Date(), endDate);
};

export const calculateNextRentDue = (startDate: Date): Date => {
  const today = new Date();
  let nextDue = new Date(startDate);

  while (isBefore(nextDue, today)) {
    nextDue = addMonths(nextDue, 1);
  }

  return nextDue;
};

export const getDaysUntilDue = (dueDate: Date): number => {
  return differenceInDays(dueDate, new Date());
};

export const isPaymentLate = (dueDate: Date): boolean => {
  return isAfter(new Date(), addDays(dueDate, 1)); // Grace period of 1 day
};
