module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: {
    "^vscode$": "<rootDir>/src/_mocks_/vscode.ts"
  },

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};