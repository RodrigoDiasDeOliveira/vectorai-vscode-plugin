// src/_tests_/suggestOptimization.test.ts
import { suggestOptimizationCommand } from '../commands/suggestOptimization';
import { huggingfaceService } from '../services/huggingfaceService';
import * as vscode from 'vscode';

jest.mock('../services/huggingfaceService');
jest.mock('vscode');

describe('Suggest Optimization Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a suggestion string', async () => {
    (vscode.window.showInputBox as jest.Mock).mockResolvedValue('SELECT * FROM documents');
    (huggingfaceService.suggestQueryImprovements as jest.Mock).mockResolvedValue(
      "Sugestão para 'SELECT * FROM documents': use cláusulas WHERE mais específicas."
    );
    (vscode.window.showInformationMessage as jest.Mock).mockImplementation(() => {});

    const suggestion = await suggestOptimizationCommand();

    expect(suggestion).toBeDefined();
    expect(typeof suggestion).toBe('string');
    expect(suggestion).toContain('Sugestão para');
  });

  it('should return empty string if input is empty or cancelled', async () => {
    (vscode.window.showInputBox as jest.Mock).mockResolvedValue('');
    let suggestion = await suggestOptimizationCommand();
    expect(suggestion).toBe('');

    (vscode.window.showInputBox as jest.Mock).mockResolvedValue(undefined);
    suggestion = await suggestOptimizationCommand();
    expect(suggestion).toBe('');
  });
});
