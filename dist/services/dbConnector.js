"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticSearch = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'user',
    host: 'localhost',
    database: 'vector_db',
    password: 'password',
    port: 5432,
});
function semanticSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const sql = `SELECT * FROM documents ORDER BY embedding <#> $1 LIMIT 5`;
            const res = yield client.query(sql, [query]);
            return res.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.semanticSearch = semanticSearch;
