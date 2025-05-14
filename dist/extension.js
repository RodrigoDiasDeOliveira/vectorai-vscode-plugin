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
exports.deactivate = exports.activate = void 0;
// src/extension.ts
const vscode = __importStar(require("vscode"));
const embeddingCommand_1 = require("/workspaces/vectorai-vscode-plugin/src/commands/embeddingCommand");
const VectorAIService_1 = require("./services/VectorAIService");
const logger_1 = require("./utils/logger");
function activate(context) {
    logger_1.Logger.log('VectorAI Plugin activated.');
    const huggingfaceApiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
    const huggingfaceApiKey = vscode.workspace.getConfiguration('vectorai').get('huggingfaceApiKey') || '';
    if (!huggingfaceApiKey) {
        logger_1.Logger.error('HuggingFace API key not configured. Set it in your settings.');
        return;
    }
    const vectorService = new VectorAIService_1.VectorAIService(huggingfaceApiUrl, huggingfaceApiKey);
    const embeddingCommand = new embeddingCommand_1.EmbeddingCommand(vectorService);
    context.subscriptions.push(embeddingCommand.register());
}
exports.activate = activate;
function deactivate() {
    logger_1.Logger.log('VectorAI Plugin deactivated.');
}
exports.deactivate = deactivate;
