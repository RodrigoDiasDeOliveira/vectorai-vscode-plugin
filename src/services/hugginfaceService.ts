import axios from 'axios';

const HF_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
const HF_TOKEN = process.env.HF_API_TOKEN || '';

export async function getEmbeddingFromText(text: string): Promise<number[]> {
  const res = await axios.post(HF_API_URL, { inputs: text }, {
    headers: { Authorization: `Bearer ${HF_TOKEN}` },
  });
  return res.data[0];
}

export async function suggestQueryImprovements(query: string): Promise<string> {
  // Placeholder simplificado
  return `Sugestão para '${query}': use cláusulas WHERE mais específicas.`;
}