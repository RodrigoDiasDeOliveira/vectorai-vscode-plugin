import * as vscode from 'vscode';
import { huggingfaceService } from '../services/huggingfaceService';
import { Logger } from '../utils/logger';

export async function generateEmbedding() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return Logger.error('Nenhum editor ativo.');
  }

  const selection = editor.document.getText(editor.selection);
  if (!selection.trim()) {
    return Logger.error('Selecione um texto para gerar o embedding.');
  }

  try {
    Logger.log('Gerando embedding...');
    const embedding = await huggingfaceService.getEmbeddingFromText(selection);

    const output = JSON.stringify(embedding, null, 2);
    Logger.log(`✅ Embedding gerado (${embedding.length} dimensões)`);
    vscode.window.showInformationMessage(`Embedding gerado com ${embedding.length} dimensões!`);

    // Opcional: copiar para clipboard
    await vscode.env.clipboard.writeText(output);
  } catch (error: any) {
    Logger.error(error.message);
  }
}