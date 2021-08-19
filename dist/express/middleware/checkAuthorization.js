"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
var checkAuthorization = function (req, //gives errors when type is set to Request
res, //gives errors when type is set to Response
next) {
    if (!req.user)
        res
            .status(401)
            .send({ error: "you are unauthorized to make this request" });
    else
        next();
};
exports.checkAuthorization = checkAuthorization;
