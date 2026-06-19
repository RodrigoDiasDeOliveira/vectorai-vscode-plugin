import * as vscode from 'vscode';
import { huggingfaceService } from '../services/huggingfaceService';
import { Logger } from '../utils/logger';

export async function suggestOptimizationCommand(): Promise<string> {

  const input = await vscode.window.showInputBox({
    prompt: 'Digite a query SQL para otimizar'
  });

  if (!input) {
    return '';
  }

  try {

    const suggestion =
      await huggingfaceService.suggestQueryImprovements(input);

    Logger.log('Sugestão de otimização gerada.');

    vscode.window.showInformationMessage(
      'Sugestão gerada! Veja o console ou Output.'
    );

    return suggestion;

  } catch (error: unknown) {

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    Logger.error(message);

    return '';
  }
}