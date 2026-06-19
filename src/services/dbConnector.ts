import { Pool } from 'pg';
import * as vscode from 'vscode';
import { Logger } from '../utils/logger';

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    const config = vscode.workspace.getConfiguration('vectorai');
    // Você pode expandir as configurações depois
    pool = new Pool({
      user: 'seu_usuario',
      host: 'localhost',
      database: 'seu_banco',
      password: 'sua_senha',
      port: 5432,
      // ssl: { rejectUnauthorized: false } // se necessário
    });
  }
  return pool;
}

export interface DocumentRow {
  id: number;
  text: string;
  embedding: number[];
  // adicione outros campos conforme sua tabela
}

export const dbConnector = {
  async semanticSearch(queryEmbedding: number[]): Promise<DocumentRow[]> {
    const client = await getPool().connect();
    try {
      const sql = `SELECT id, text, embedding 
                   FROM documents 
                   ORDER BY embedding <#> $1 
                   LIMIT 10`;
      const res = await client.query(sql, [queryEmbedding]);
      return res.rows as DocumentRow[];
    } catch (err: any) {
      Logger.error(`Erro no banco: ${err.message}`);
      return [];
    } finally {
      client.release();
    }
  }
};