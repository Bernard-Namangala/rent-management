"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentType = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["RENT"] = "RENT";
    PaymentType["DEPOSIT"] = "DEPOSIT";
    PaymentType["MAINTENANCE"] = "MAINTENANCE";
    PaymentType["LATE_FEE"] = "LATE_FEE";
    PaymentType["OTHER"] = "OTHER";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
//# sourceMappingURL=payment.js.map