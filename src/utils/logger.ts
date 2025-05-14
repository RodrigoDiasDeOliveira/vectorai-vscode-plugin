// src/utils/Logger.ts
import * as vscode from 'vscode';

export class Logger {
  static log(message: string) {
    vscode.window.showInformationMessage(`[VectorAI] ${message}`);
  }

  static error(message: string) {
    vscode.window.showErrorMessage(`[VectorAI Error] ${message}`);
  }
}
