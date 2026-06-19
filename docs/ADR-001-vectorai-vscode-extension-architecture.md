# ADR-001: VectorAI VS Code Extension Architecture

## Status

Accepted

## Date

2026-06-19

## Context

VectorAI is designed as a Visual Studio Code extension that provides AI-powered developer assistance features, including embedding generation, semantic search, and query optimization suggestions.

The project requires a maintainable architecture that allows future integration with external AI services, vector databases, and cloud platforms.

A clear separation between extension commands, business services, and utilities is required to improve maintainability and testing.

## Decision

The project will follow a layered architecture:

- Commands layer:
  Handles VS Code interactions and user actions.

- Services layer:
  Contains business logic and integrations with external systems.

- Utils layer:
  Provides shared components such as logging and helpers.

The architecture will follow separation of responsibilities and allow future replacement of providers without changing command implementations.

## Consequences

Positive:

- Better maintainability
- Easier unit testing
- Clear separation of concerns
- Future scalability for AI providers and cloud integrations

Negative:

- Additional files and abstractions
- Slightly higher initial complexity
