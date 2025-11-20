// src/commands/semanticSearch.ts
import * as vscode from 'vscode';
import { dbConnector } from '../services/dbConnector';
import { huggingfaceService } from '../services/huggingfaceService';

/**
 * Comando de busca semântica no VS Code
 * - Solicita input do usuário
 * - Converte texto em embedding via huggingfaceService
 * - Chama dbConnector.semanticSearch
 * - Mostra resultados no VS Code
 * - Retorna resultados para testes unitários
 */
export async function semanticSearchCommand() {
  const query = await vscode.window.showInputBox({ prompt: 'Digite a busca semântica:' });

  // Retorna array vazio se input cancelado ou vazio
  if (!query?.trim()) return [];

  try {
    // Converte texto em embedding numérico
    const embedding = await huggingfaceService.getEmbeddingFromText(query);

    // Busca semântica no banco
    const results = await dbConnector.semanticSearch(embedding);

    // Mostra mensagem de sucesso
    vscode.window.showInformationMessage(`Resultados encontrados: ${results.length}`);
    console.log('Resultados da busca semântica:', results);

    return results; // Retorno para testes unitários
  } catch (err) {
    console.error('Erro na busca semântica:', err);
    vscode.window.showErrorMessage('Erro na busca semântica. Veja o console.');

    return []; // Retorno consistente em caso de erro
  }
}
