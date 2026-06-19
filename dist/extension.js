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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const generateEmbedding_1 = require("./commands/generateEmbedding");
const semanticSearch_1 = require("./commands/semanticSearch");
const suggestOptimization_1 = require("./commands/suggestOptimization");
const logger_1 = require("./utils/logger");
function activate(context) {
    logger_1.Logger.log('Vector AI Plugin ativado com sucesso! 🚀');
    context.subscriptions.push(vscode.commands.registerCommand('vectorai.generateEmbedding', generateEmbedding_1.generateEmbedding), vscode.commands.registerCommand('vectorai.semanticSearch', semanticSearch_1.semanticSearchCommand), vscode.commands.registerCommand('vectorai.suggestOptimization', suggestOptimization_1.suggestOptimizationCommand));
}
function deactivate() {
    logger_1.Logger.log('Vector AI Plugin desativado.');
}
//# sourceMappingURL=extension.js.map