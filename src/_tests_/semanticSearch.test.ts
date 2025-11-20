// src/_tests_/semanticSearch.test.ts
import { semanticSearchCommand } from '../commands/semanticSearch';
import { huggingfaceService } from '../services/huggingfaceService';
import { dbConnector } from '../services/dbConnector';
import * as vscode from 'vscode';

jest.mock('../services/huggingfaceService');
jest.mock('../services/dbConnector');
jest.mock('vscode');

describe('Semantic Search Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a ranked list of results', async () => {
    (vscode.window.showInputBox as jest.Mock).mockResolvedValue('test query');
    (huggingfaceService.getEmbeddingFromText as jest.Mock).mockResolvedValue([0.1, 0.2, 0.3]);
    (dbConnector.semanticSearch as jest.Mock).mockResolvedValue([
      { id: 1, text: 'Exemplo 1', embedding: [0.1, 0.2, 0.3] },
    ]);
    (vscode.window.showInformationMessage as jest.Mock).mockImplementation(() => {});

    const results = await semanticSearchCommand();

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
    expect(results[0].text).toBe('Exemplo 1');
  });

  it('should return empty array if input is empty or cancelled', async () => {
    (vscode.window.showInputBox as jest.Mock).mockResolvedValue(undefined);
    const results = await semanticSearchCommand();
    expect(results).toEqual([]);
  });
});
