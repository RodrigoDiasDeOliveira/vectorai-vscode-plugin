// src/_tests_/generateEmbedding.test.ts
import * as vscode from 'vscode';
import { generateEmbedding } from '../commands/generateEmbedding';
import { huggingfaceService } from '../services/huggingfaceService';

jest.mock('../services/huggingfaceService');
jest.mock('vscode');

describe('Generate Embedding Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate an embedding for selected text', async () => {
    const mockText = 'Texto de teste';
    (vscode.window.activeTextEditor as any) = {
      selection: {},
      document: {
        getText: jest.fn().mockReturnValue(mockText),
      },
    };

    (huggingfaceService.getEmbeddingFromText as jest.Mock).mockResolvedValue([0.1, 0.2, 0.3]);
    (vscode.window.showInformationMessage as jest.Mock).mockImplementation(() => {});

    const embedding = await generateEmbedding();

    expect(embedding).toBeDefined();
    expect(Array.isArray(embedding)).toBe(true);
    expect(embedding).toEqual([0.1, 0.2, 0.3]);
    expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
      'Embedding gerado com sucesso. Veja o console para detalhes.'
    );
  });

  it('should return undefined if no text is selected', async () => {
    (vscode.window.activeTextEditor as any) = {
      selection: {},
      document: { getText: jest.fn().mockReturnValue('   ') },
    };
    const embedding = await generateEmbedding();
    expect(embedding).toBeUndefined();
    expect(vscode.window.showWarningMessage).toHaveBeenCalledWith(
      'Selecione algum texto para gerar o embedding.'
    );
  });

  it('should return undefined if no editor is active', async () => {
    (vscode.window.activeTextEditor as any) = undefined;
    const embedding = await generateEmbedding();
    expect(embedding).toBeUndefined();
  });
});

