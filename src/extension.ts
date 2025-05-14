// src/extension.ts
import * as vscode from 'vscode';
import { EmbeddingCommand } from '/workspaces/vectorai-vscode-plugin/src/commands/embeddingCommand';
import { VectorAIService } from './services/VectorAIService';
import { Logger } from './utils/logger';

export function activate(context: vscode.ExtensionContext) {
  Logger.log('VectorAI Plugin activated.');

  const huggingfaceApiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
  const huggingfaceApiKey = vscode.workspace.getConfiguration('vectorai').get<string>('huggingfaceApiKey') || '';

  if (!huggingfaceApiKey) {
    Logger.error('HuggingFace API key not configured. Set it in your settings.');
    return;
  }

  const vectorService = new VectorAIService(huggingfaceApiUrl, huggingfaceApiKey);
  const embeddingCommand = new EmbeddingCommand(vectorService);

  context.subscriptions.push(embeddingCommand.register());
}

export function deactivate() {
  Logger.log('VectorAI Plugin deactivated.');
}

