import * as vscode from 'vscode';
import { VectorAIService } from '../services/VectorAIService';
import { Logger } from '../utils/logger';

export class EmbeddingCommand {
  private vectorService: VectorAIService;

  constructor(vectorService: VectorAIService) {
    this.vectorService = vectorService;
  }

  // Método para gerar o embedding de texto
  async getEmbedding(text: string): Promise<any> {
    try {
      const embedding = await this.vectorService.getEmbedding(text);  // Chama o método da VectorAIService
      if (!embedding) {
        Logger.error('Failed to generate embedding.');
        return;
      }
      const output = JSON.stringify(embedding, null, 2);
      Logger.log(`Embedding generated:\n${output}`);
      return embedding;
    } catch (error) {
      Logger.error(`Error generating embedding: ${error}`);
    }
  }

  register(): vscode.Disposable {
    return vscode.commands.registerCommand('vectorai.generateEmbedding', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return Logger.error('No active editor.');

      const selection = editor.document.getText(editor.selection);
      if (!selection) return Logger.error('No text selected.');

      Logger.log('Generating embedding...');
      await this.getEmbedding(selection);  // Chama o novo método getEmbedding aqui
    });
  }
}
