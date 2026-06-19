export const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn((key: string, defaultValue: unknown) => defaultValue)
  })),

  getActiveTextEditor: jest.fn()
};

export const window = {
  showInputBox: jest.fn(),
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),

  activeTextEditor: undefined
};

export const commands = {
  registerCommand: jest.fn()
};
export const env = {
  clipboard: {
    writeText: jest.fn()
  }
};