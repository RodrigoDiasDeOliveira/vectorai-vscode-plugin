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
exports.suggestOptimizationCommand = suggestOptimizationCommand;
const vscode = __importStar(require("vscode"));
const huggingfaceService_1 = require("../services/huggingfaceService");
const logger_1 = require("../utils/logger");
async function suggestOptimizationCommand() {
    const input = await vscode.window.showInputBox({
        prompt: 'Digite a query SQL para otimizar'
    });
    if (!input) {
        return '';
    }
    try {
        const suggestion = await huggingfaceService_1.huggingfaceService.suggestQueryImprovements(input);
        logger_1.Logger.log('Sugestão de otimização gerada.');
        vscode.window.showInformationMessage('Sugestão gerada! Veja o console ou Output.');
        return suggestion;
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : String(error);
        logger_1.Logger.error(message);
        return '';
    }
}
//# sourceMappingURL=suggestOptimization.js.map