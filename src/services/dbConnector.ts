import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'vector_db',
  password: 'password',
  port: 5432,
});

export async function semanticSearch(query: string) {
  const client = await pool.connect();
  try {
    const sql = `SELECT * FROM documents ORDER BY embedding <#> $1 LIMIT 5`;
    const res = await client.query(sql, [query]);
    return res.rows;
  } finally {
    client.release();
  }
}