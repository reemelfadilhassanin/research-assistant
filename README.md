# 🤖 Research Assistant - RAG Q&A Bot

A full-stack Retrieval-Augmented Generation (RAG) assistant:

- Upload PDF, TXT, or specify a URL.
- Parses & splits content into meaningful chunks.
- Generates embeddings using Cohere (embed-english-v2.0).
- Stores vectors in Supabase (pgvector).
- On user query:
  - Retrieves the top-matching content using Supabase RPC.
  - Passes context to LLaMA3 via Groq API for final answer.

## 🔥 Tech Stack

- Node.js / Express backend
- LangChain for chains & document loaders
- Supabase (vector store)
- Cohere (embeddings)
- Groq (LLM with LLaMA3-70b)
- React frontend (Upload & Ask components)
