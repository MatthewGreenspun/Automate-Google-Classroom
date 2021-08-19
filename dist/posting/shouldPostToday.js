"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldPostToday = void 0;
function shouldPostToday(postingDays) {
    var today = new Date().toUTCString().substring(0, 3).toLowerCase();
    return postingDays.includes(today);
}
exports.shouldPostToday = shouldPostToday;
