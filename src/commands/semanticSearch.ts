
import * as vscode from 'vscode';
import { dbConnector } from '../services/dbConnector';
import { huggingfaceService } from '../services/huggingfaceService';
import { Logger } from '../utils/logger';

export async function semanticSearchCommand() {
  const query = await vscode.window.showInputBox({
    prompt: 'Digite o texto para busca semântica',
    placeHolder: 'Ex: Como funciona o pgvector?'
  });

  if (!query?.trim()) return [];

  try {
    const embedding = await huggingfaceService.getEmbeddingFromText(query);
    const results = await dbConnector.semanticSearch(embedding);

    vscode.window.showInformationMessage(`✅ ${results.length} resultados encontrados`);
    console.log('Resultados da busca semântica:', results);
    Logger.log(`Busca semântica concluída com ${results.length} resultados.`);

    return results;
  } catch (err: any) {
    Logger.error(`Erro na busca semântica: ${err.message}`);
    return [];
  }
}