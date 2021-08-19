"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToISO = void 0;
function timeToISO(time) {
    var hours = Number(time.substring(0, 2));
    var minutes = Number(time.substring(3, 5));
    var now = new Date();
    var fullDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hours, minutes, 0, 0));
    return fullDate.toISOString();
}
exports.timeToISO = timeToISO;
