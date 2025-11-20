import * as vscode from 'vscode';
import { suggestQueryImprovements } from '../services/huggingfaceService';

export async function suggestOptimizationCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const selection = editor.selection;
  const query = editor.document.getText(selection);

  const suggestion = await suggestQueryImprovements(query);
  vscode.window.showInformationMessage('Sugestão de melhoria gerada. Veja o console.');
  console.log(suggestion);
}