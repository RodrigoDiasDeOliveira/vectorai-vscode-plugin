import { dbConnector, DocumentRow } from '../services/dbConnector';

// Mock simples do Pool se não quisermos depender do PostgreSQL real
jest.mock('pg', () => {
  const mClient = { query: jest.fn(), release: jest.fn() };
  const mPool = { connect: jest.fn(() => mClient) };
  return { Pool: jest.fn(() => mPool) };
});

describe('DB Connector', () => {
  it('should return search results', async () => {
    // Mock do client.query
    const mockResults: DocumentRow[] = [
      { id: 1, text: 'Exemplo 1', embedding: [0.1, 0.2] },
      { id: 2, text: 'Exemplo 2', embedding: [0.3, 0.4] },
    ];
    const { Pool } = require('pg');
    const client = await new Pool().connect();
    client.query.mockResolvedValue({ rows: mockResults });

    const results = await dbConnector.semanticSearch([0.1, 0.2]);
    expect(results).toEqual(mockResults);
  });

  it('should return empty array on error', async () => {
    const { Pool } = require('pg');
    const client = await new Pool().connect();
    client.query.mockRejectedValue(new Error('DB Error'));

    const results = await dbConnector.semanticSearch([0.1, 0.2]);
    expect(results).toEqual([]);
  });
});
