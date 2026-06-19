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
exports.EmbeddingCommand = void 0;
const vscode = __importStar(require("vscode"));
const logger_1 = require("../utils/logger");
class EmbeddingCommand {
    vectorService;
    constructor(vectorService) {
        this.vectorService = vectorService;
    }
    // Método para gerar o embedding de texto
    async getEmbedding(text) {
        try {
            const embedding = await this.vectorService.getEmbedding(text); // Chama o método da VectorAIService
            if (!embedding) {
                logger_1.Logger.error('Failed to generate embedding.');
                return;
            }
            const output = JSON.stringify(embedding, null, 2);
            logger_1.Logger.log(`Embedding generated:\n${output}`);
            return embedding;
        }
        catch (error) {
            logger_1.Logger.error(`Error generating embedding: ${error}`);
        }
    }
    register() {
        return vscode.commands.registerCommand('vectorai.generateEmbedding', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor)
                return logger_1.Logger.error('No active editor.');
            const selection = editor.document.getText(editor.selection);
            if (!selection)
                return logger_1.Logger.error('No text selected.');
            logger_1.Logger.log('Generating embedding...');
            await this.getEmbedding(selection); // Chama o novo método getEmbedding aqui
        });
    }
}
exports.EmbeddingCommand = EmbeddingCommand;
//# sourceMappingURL=embeddingCommand.js.map