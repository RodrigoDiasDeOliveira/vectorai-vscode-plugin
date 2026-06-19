"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnector = void 0;
const pg_1 = require("pg");
const vscode = __importStar(require("vscode"));
const logger_1 = require("../utils/logger");
let pool = null;
function getPool() {
    if (!pool) {
        const config = vscode.workspace.getConfiguration('vectorai');
        pool = new pg_1.Pool({
            user: config.get('dbUser', 'seu_usuario'),
            host: config.get('dbHost', 'localhost'),
            database: config.get('dbName', 'seu_banco'),
            password: config.get('dbPassword', 'sua_senha'),
            port: config.get('dbPort', 5432)
        });
    }
    return pool;
}
exports.dbConnector = {
    async semanticSearch(queryEmbedding) {
        const client = await getPool().connect();
        try {
            const sql = `
        SELECT id, text, embedding
        FROM documents
        ORDER BY embedding <#> $1
        LIMIT 10
      `;
            const res = await client.query(sql, [queryEmbedding]);
            return res.rows;
        }
        catch (err) {
            const error = err instanceof Error
                ? err.message
                : String(err);
            logger_1.Logger.error(`Erro no banco: ${error}`);
            return [];
        }
        finally {
            client.release();
        }
    }
};
//# sourceMappingURL=dbConnector.js.map