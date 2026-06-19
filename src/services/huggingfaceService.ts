import axios from 'axios';
import * as vscode from 'vscode';
import { Logger } from '../utils/logger';

const HF_API_URL = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';

export const huggingfaceService = {
  async getEmbeddingFromText(text: string): Promise<number[]> {
    const config = vscode.workspace.getConfiguration('vectorai');
    const apiKey = config.get<string>('huggingfaceApiKey');

    if (!apiKey) {
      throw new Error('Hugging Face API Key não configurada. Configure em Settings → Vector AI.');
    }

    try {
      const response = await axios.post(HF_API_URL, { inputs: text }, {
        headers: { Authorization: `Bearer ${apiKey}` },
        timeout: 15000
      });

      const embedding = Array.isArray(response.data) ? response.data[0] : response.data;
      Logger.log('Embedding gerado com sucesso');
      return embedding;
    } catch (error: any) {
      Logger.error(`Erro ao gerar embedding: ${error.message}`);
      throw error;
    }
  },

  async suggestQueryImprovements(query: string): Promise<string> {
    return `🔧 Sugestão para a query:\n\n${query}\n\n→ Use índice HNSW, filtre com metadados, combine com busca por palavras-chave e limite a quantidade de resultados.`;
  }
};