import * as vscode from 'vscode';
import { semanticSearch } from '../services/dbConnector';

export async function semanticSearchCommand() {
  const query = await vscode.window.showInputBox({ prompt: 'Digite a busca semântica:' });
  if (!query) return;

  const results = await semanticSearch(query);
  vscode.window.showInformationMessage(`Resultados encontrados: ${results.length}`);
  console.log(results);
}
