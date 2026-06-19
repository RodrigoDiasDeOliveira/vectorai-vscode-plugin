import * as vscode from 'vscode';
import { generateEmbedding } from './commands/generateEmbedding';
import { semanticSearchCommand } from './commands/semanticSearch';
import { suggestOptimizationCommand } from './commands/suggestOptimization';
import { Logger } from './utils/logger';

export function activate(context: vscode.ExtensionContext) {
  Logger.log('Vector AI Plugin ativado com sucesso! 🚀');

  context.subscriptions.push(
    vscode.commands.registerCommand('vectorai.generateEmbedding', generateEmbedding),
    vscode.commands.registerCommand('vectorai.semanticSearch', semanticSearchCommand),
    vscode.commands.registerCommand('vectorai.suggestOptimization', suggestOptimizationCommand)
  );
}

export function deactivate() {
  Logger.log('Vector AI Plugin desativado.');
}