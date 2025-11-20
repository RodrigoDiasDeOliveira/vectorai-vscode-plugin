// src/__mocks__/vscode.ts
export const window = {
  showInputBox: jest.fn(),
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  activeTextEditor: undefined,
};

export const workspace = {};
export const commands = { registerCommand: jest.fn() };
export const extensions = {};
