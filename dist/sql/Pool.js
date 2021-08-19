"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});
exports.default = pool;
