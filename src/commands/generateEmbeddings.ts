import * as vscode from 'vscode';
import { getEmbeddingFromText } from '/workspaces/vectorai-vscode-plugin/src/services/hugginfaceService';

export async function generateEmbedding() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  if (!text.trim()) {
    vscode.window.showWarningMessage('Selecione algum texto para gerar o embedding.');
    return;
  }

  const embedding = await getEmbeddingFromText(text);
  vscode.window.showInformationMessage('Embedding gerado com sucesso. Veja o console para detalhes.');
  console.log('Embedding:', embedding);
}
