"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenancePriority = exports.MaintenanceStatus = void 0;
var MaintenanceStatus;
(function (MaintenanceStatus) {
    MaintenanceStatus["PENDING"] = "PENDING";
    MaintenanceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    MaintenanceStatus["COMPLETED"] = "COMPLETED";
    MaintenanceStatus["CANCELLED"] = "CANCELLED";
})(MaintenanceStatus || (exports.MaintenanceStatus = MaintenanceStatus = {}));
var MaintenancePriority;
(function (MaintenancePriority) {
    MaintenancePriority["LOW"] = "LOW";
    MaintenancePriority["MEDIUM"] = "MEDIUM";
    MaintenancePriority["HIGH"] = "HIGH";
    MaintenancePriority["EMERGENCY"] = "EMERGENCY";
})(MaintenancePriority || (exports.MaintenancePriority = MaintenancePriority = {}));
//# sourceMappingURL=maintenance.js.map