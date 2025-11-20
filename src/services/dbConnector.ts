// src/services/dbConnector.ts
import { Pool } from 'pg';

// Configuração da conexão com PostgreSQL
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'vector_db',
  password: 'password',
  port: 5432,
});

// Tipo de retorno esperado da query
export interface DocumentRow {
  id: number;
  text: string;
  embedding: number[];
}

// Objeto dbConnector com métodos
export const dbConnector = {
  /**
   * Busca semântica usando pgvector
   * @param query Embedding do texto
   * @returns Array de documentos ordenados pela similaridade
   */
  semanticSearch: async (query: number[]): Promise<DocumentRow[]> => {
    const client = await pool.connect();
    try {
      const sql = `SELECT * FROM documents ORDER BY embedding <#> $1 LIMIT 5`;
      const res = await client.query(sql, [query]);
      return res.rows as DocumentRow[];
    } catch (err) {
      console.error('Erro no semanticSearch DB:', err);
      return []; // Retorno seguro em caso de erro
    } finally {
      client.release();
    }
  },
};
