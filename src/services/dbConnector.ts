import { Pool } from 'pg';
import * as vscode from 'vscode';
import { Logger } from '../utils/logger';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const config = vscode.workspace.getConfiguration('vectorai');

    pool = new Pool({
      user: config.get<string>('dbUser', 'seu_usuario'),
      host: config.get<string>('dbHost', 'localhost'),
      database: config.get<string>('dbName', 'seu_banco'),
      password: config.get<string>('dbPassword', 'sua_senha'),
      port: config.get<number>('dbPort', 5432)
    });
  }

  return pool;
}

export interface DocumentRow {
  id: number;
  text: string;
  embedding: number[];
}

export const dbConnector = {

  async semanticSearch(queryEmbedding: number[]): Promise<DocumentRow[]> {

    const client = await getPool().connect();

    try {

      const sql = `
        SELECT id, text, embedding
        FROM documents
        ORDER BY embedding <#> $1
        LIMIT 10
      `;

      const res = await client.query(sql, [queryEmbedding]);

      return res.rows as DocumentRow[];

    } catch (err: unknown) {

      const error = err instanceof Error 
        ? err.message 
        : String(err);

      Logger.error(`Erro no banco: ${error}`);

      return [];

    } finally {

      client.release();

    }
  }
};