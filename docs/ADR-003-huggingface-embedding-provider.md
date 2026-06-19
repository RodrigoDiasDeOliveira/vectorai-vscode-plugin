# ADR-003: Hugging Face Embedding Provider

## Status

Accepted

## Context

VectorAI requires an embedding generation service.

The solution should allow experimentation with different AI models while avoiding vendor lock-in.

## Decision

Hugging Face models will be used as the initial embedding provider through a service abstraction.

The embedding implementation will be isolated inside:

services/huggingfaceService.ts

## Consequences

Positive:

- Access to multiple open AI models
- Flexible experimentation
- Reduced dependency on a single provider

Negative:

- Model selection impacts quality and performance
- External service dependency
