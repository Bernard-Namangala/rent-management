"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = exports.isValidAmount = exports.isValidPhoneNumber = exports.getPasswordStrength = exports.isValidPassword = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    return passwordRegex.test(password);
};
exports.isValidPassword = isValidPassword;
const getPasswordStrength = (password) => {
    if (!password)
        return "weak";
    let strength = 0;
    // Length check
    if (password.length >= 8)
        strength++;
    if (password.length >= 12)
        strength++;
    // Character type checks
    if (/[A-Z]/.test(password))
        strength++;
    if (/[a-z]/.test(password))
        strength++;
    if (/[0-9]/.test(password))
        strength++;
    if (/[\W]/.test(password))
        strength++;
    if (strength >= 5)
        return "strong";
    if (strength >= 3)
        return "medium";
    return "weak";
};
exports.getPasswordStrength = getPasswordStrength;
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};
exports.isValidPhoneNumber = isValidPhoneNumber;
const isValidAmount = (amount) => {
    return amount > 0 && Number.isFinite(amount);
};
exports.isValidAmount = isValidAmount;
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};
exports.formatCurrency = formatCurrency;
//# sourceMappingURL=validation.js.map