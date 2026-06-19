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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticSearchCommand = semanticSearchCommand;
const vscode = __importStar(require("vscode"));
const dbConnector_1 = require("../services/dbConnector");
const huggingfaceService_1 = require("../services/huggingfaceService");
const logger_1 = require("../utils/logger");
async function semanticSearchCommand() {
    const query = await vscode.window.showInputBox({
        prompt: 'Digite o texto para busca semântica',
        placeHolder: 'Ex: Como funciona o pgvector?'
    });
    if (!query?.trim())
        return [];
    try {
        const embedding = await huggingfaceService_1.huggingfaceService.getEmbeddingFromText(query);
        const results = await dbConnector_1.dbConnector.semanticSearch(embedding);
        vscode.window.showInformationMessage(`✅ ${results.length} resultados encontrados`);
        console.log('Resultados da busca semântica:', results);
        logger_1.Logger.log(`Busca semântica concluída com ${results.length} resultados.`);
        return results;
    }
    catch (err) {
        logger_1.Logger.error(`Erro na busca semântica: ${err.message}`);
        return [];
    }
}
//# sourceMappingURL=semanticSearch.js.map