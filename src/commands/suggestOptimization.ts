import * as vscode from 'vscode';
import { huggingfaceService } from '../services/huggingfaceService';
import { Logger } from '../utils/logger';

export async function suggestOptimizationCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const selection = editor.document.getText(editor.selection);
  if (!selection.trim()) {
    return Logger.error('Selecione uma query SQL para otimizar.');
  }

  try {
    const suggestion = await huggingfaceService.suggestQueryImprovements(selection);
    console.log(suggestion);
    Logger.log('Sugestão de otimização gerada.');
    vscode.window.showInformationMessage('Sugestão gerada! Veja o console ou Output.');
  } catch (error: any) {
    Logger.error(error.message);
  }
}