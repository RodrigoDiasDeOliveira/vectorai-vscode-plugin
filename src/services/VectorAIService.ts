import axios from 'axios';
import { Logger } from '../utils/logger';

export class VectorAIService {
  private huggingfaceApiUrl: string;
  private huggingfaceApiKey: string;

  constructor(huggingfaceApiUrl: string, huggingfaceApiKey: string) {
    this.huggingfaceApiUrl = huggingfaceApiUrl;
    this.huggingfaceApiKey = huggingfaceApiKey;
  }

  // Método para gerar o embedding de um texto usando a API da HuggingFace
  async getEmbedding(text: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.huggingfaceApiUrl}/models/distilbert-base-uncased`,
        { inputs: text },
        {
          headers: {
            'Authorization': `Bearer ${this.huggingfaceApiKey}`,
          },
        }
      );

      // Verifica a resposta da API
      if (response.data && response.data[0]) {
        const embedding = response.data[0].embedding;
        Logger.log('Embedding generated successfully.');
        return embedding;
      } else {
        Logger.error('Failed to retrieve embedding from HuggingFace API.');
        return null;
      }
    } catch (error) {
      Logger.error(`Error calling HuggingFace API: ${error}`);
      return null;
    }
  }
}
