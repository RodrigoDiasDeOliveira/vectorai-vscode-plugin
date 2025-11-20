// src/services/huggingfaceService.ts
import axios from 'axios';

const HF_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
const HF_TOKEN = process.env.HF_API_TOKEN || '';

export const huggingfaceService = {
  getEmbeddingFromText: async (text: string): Promise<number[]> => {
    const res = await axios.post(HF_API_URL, { inputs: text }, {
      headers: { Authorization: `Bearer ${HF_TOKEN}` },
    });
    return res.data[0];
  },

  suggestQueryImprovements: async (query: string): Promise<string> => {
    return `Sugestão para '${query}': use cláusulas WHERE mais específicas.`;
  },
};
