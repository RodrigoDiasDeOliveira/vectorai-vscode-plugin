# ADR-002: Semantic Search Using Embeddings

## Status

Accepted

## Context

Traditional keyword-based search is limited when developers need to find information based on meaning rather than exact terms.

VectorAI requires a semantic understanding capability.

## Decision

VectorAI will use embedding-based semantic search.

Text content will be transformed into numerical vectors and compared using similarity calculations.

The architecture will support:

- Embedding generation
- Vector storage
- Similarity search
- AI-assisted retrieval

## Consequences

Positive:

- More intelligent search experience
- Supports Retrieval Augmented Generation (RAG) patterns
- Enables future AI workflows

Negative:

- Requires embedding generation infrastructure
- Requires vector storage strategy
