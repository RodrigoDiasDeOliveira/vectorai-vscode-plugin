import * as vscode from 'vscode';

export class Logger {
  static log(message: string) {
    vscode.window.showInformationMessage(`[Vector AI] ${message}`);
    console.log(`[Vector AI] ${message}`);
  }

  static error(message: string) {
    vscode.window.showErrorMessage(`[Vector AI] ${message}`);
    console.error(`[Vector AI] ${message}`);
  }
}
