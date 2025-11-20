import * as vscode from 'vscode';
import { huggingfaceService  } from '../services/huggingfaceService';

export async function generateEmbedding() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  if (!text.trim()) {
    vscode.window.showWarningMessage('Selecione algum texto para gerar o embedding.');
    return;
  }

  try {
    const embedding = await huggingfaceService.getEmbeddingFromText(text);
    vscode.window.showInformationMessage('Embedding gerado com sucesso. Veja o console para detalhes.');
    console.log('Embedding:', embedding);
    return embedding; // Retornar para facilitar testes unitários
  } catch (err) {
    console.error('Erro ao gerar embedding:', err);
    vscode.window.showErrorMessage('Erro ao gerar embedding. Veja o console para detalhes.');
  }
}
