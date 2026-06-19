# VectorAI VS Code Plugin

<img width="1024" height="1024" alt="vectorPlugin" src="https://github.com/user-attachments/assets/0e57484a-e59a-4f10-86b8-8af35b3b6b69" />


## Overview

VectorAI is an AI-powered Visual Studio Code extension designed to improve developer productivity by bringing semantic search, embeddings generation, and intelligent code assistance directly into the development environment.

The extension provides AI capabilities for developers working with vector databases, semantic retrieval, and modern AI workflows, including PostgreSQL with pgvector and embedding-based search architectures.

The project is built with TypeScript using the Visual Studio Code Extension API, with AI integrations through Hugging Face models and vector-based technologies.

---

# Features

## 🧠 Embedding Generation

Generate vector embeddings from selected text directly inside VS Code.

Capabilities:

- Transform code or text into numerical representations
- Prepare content for semantic retrieval workflows
- Support AI-powered developer tools


## 🔍 Semantic Search

Perform similarity-based searches using vector embeddings.

Designed to support:

- Vector databases
- Knowledge retrieval
- RAG (Retrieval Augmented Generation) workflows


## 💡 AI Optimization Suggestions

Receive AI-powered suggestions for improving queries and developer content.

Current scenarios:

- SQL optimization suggestions
- Intelligent recommendations
- AI-assisted analysis


## ⚡ Native VS Code Experience

Integrated directly into the editor:

- Command Palette
- Context actions
- VS Code notifications
- Extension commands

---

# Architecture

VectorAI follows a layered architecture:
src/
├── extension.ts
│
├── commands/
│ ├── generateEmbedding.ts
│ ├── semanticSearch.ts
│ └── suggestOptimization.ts
│
├── services/
│ ├── huggingfaceService.ts
│ ├── dbConnector.ts
│ └── VectorAIService.ts
│
├── utils/
│ └── logger.ts
│
├── tests/
│
└── mocks/


## Architectural Principles

- Separation of responsibilities
- Service-based integrations
- Testable commands
- Provider abstraction
- AI service isolation

Architecture decisions are documented using ADRs.

---

# Commands

Available commands:

### `vectorAI.generateEmbedding`

Generates embeddings from selected text.

### `vectorAI.semanticSearch`

Executes semantic similarity search using vector embeddings.

### `vectorAI.suggestOptimization`

Generates AI-powered improvement suggestions.

---

# Technology Stack

## Core

- TypeScript
- Visual Studio Code Extension API
- Node.js

## AI

- Hugging Face Models
- Embedding generation
- Semantic similarity search

## Database

- PostgreSQL
- pgvector support

## Testing

- Jest
- ts-jest
- VS Code API mocks

## Tooling

- ESLint
- TypeScript Compiler
- VSCE Packaging

---

# Development

Install dependencies:

npm install
