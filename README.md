# Projeto: Vector AI Plugin (VS Code)

## Visão Geral

Este projeto é um plugin independente para o Visual Studio Code chamado **Vector AI Plugin**, cujo objetivo é auxiliar desenvolvedores que trabalham com bancos de dados vetoriais como PostgreSQL com pgvector, oferecendo geração de embeddings, busca semântica, sugestões inteligentes e análise de desempenho diretamente no ambiente de desenvolvimento.

O plugin será desenvolvido em **TypeScript**, utilizando a API do VS Code para extensão, com integração com **HuggingFace Transformers** para IA generativa e vetores.

---

## Estrutura de Diretórios

```
vector-ai-vscode-plugin/
├── src/
│   ├── extension.ts              # Ponto de entrada da extensão VS Code
│   ├── commands/
│   │   ├── generateEmbedding.ts  # Comando para gerar embedding
│   │   ├── semanticSearch.ts     # Comando para busca semântica
│   │   └── suggestOptimization.ts # Comando para sugestões de IA
│   ├── services/
│   │   ├── huggingfaceService.ts # Integração com modelos HuggingFace
│   │   └── dbConnector.ts        # Conexão e execução de queries no PostgreSQL
│   ├── utils/
│   │   ├── vectorUtils.ts        # Operações matemáticas e normalização
│   │   └── logger.ts             # Logs para depuração
├── package.json                 # Manifesto da extensão
├── tsconfig.json                # Configuração do TypeScript
├── README.md                    # Instruções e visão geral
└── .vscodeignore                # Arquivos ignorados na publicação
```

---

## Comandos da Extensão

- `vectorAI.generateEmbedding`: Gera embedding a partir de texto selecionado
- `vectorAI.semanticSearch`: Realiza busca semântica com base em vetores
- `vectorAI.suggestOptimization`: Sugere melhorias ou correções com IA generativa

Esses comandos aparecerão no menu de contexto, paleta de comandos e em atalhos configuráveis.

---

## Funcionalidades

- 🧠 **Geração de Embeddings:** Gera vetores usando modelos da HuggingFace
- 🔍 **Busca Semântica:** Realiza busca baseada em similaridade vetorial
- 💡 **Sugestões de Código:** Aponta melhorias em queries ou estrutura
- ⚡ **Interface Intuitiva:** Interação nativa com VS Code

---

## Dependências Principais

- `@vscode/api`
- `axios`
- `huggingface/hub`
- `pg` (para PostgreSQL)

---

## Próximos Passos
1. Implementação dos arquivos `extension.ts` e comandos em `commands/`
2. Integração com HuggingFace via `huggingfaceService.ts`
3. Testes locais no ambiente VS Code
4. Publicação no marketplace do VS Code

---

**Status:** Início do desenvolvimento

**Objetivo:** Transformar práticas de IA em produtividade no editor favorito dos desenvolvedores
