import * as vscode from 'vscode';
import { huggingfaceService } from '../services/huggingfaceService';
import { Logger } from '../utils/logger';

export async function generateEmbedding(): Promise<number[] | undefined> {

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    Logger.error('Nenhum editor ativo.');
    return undefined;
  }

  const selection = editor.document.getText(editor.selection);

  if (!selection.trim()) {
    vscode.window.showWarningMessage(
      'Selecione algum texto para gerar o embedding.'
    );
    return undefined;
  }

  try {

    Logger.log('Gerando embedding...');

    const embedding = await huggingfaceService.getEmbeddingFromText(selection);

    const output = JSON.stringify(embedding, null, 2);

    Logger.log(
      `✅ Embedding gerado (${embedding.length} dimensões)`
    );

    vscode.window.showInformationMessage(
      `Embedding gerado com ${embedding.length} dimensões!`
    );

    if (vscode.env?.clipboard) {
      await vscode.env.clipboard.writeText(output);
    }

    return embedding;

  } catch (error: unknown) {

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    Logger.error(message);

    return undefined;
  }
}