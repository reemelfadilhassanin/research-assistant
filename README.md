# Lumae RAG Research Assistant

A lightweight Retrieval-Augmented Generation (RAG) research assistant built with:

* **LangChain**
* **Pinecone** for vector database & similarity search
* **Hugging Face** for embeddings
* **Together AI** for powerful LLM completions

It helps you upload documents (PDFs), embed them into a vector store, and ask questions that are answered with relevant context from your data.

> 🚀 **Live demo:**
>
> 👉 [https://lumae.onrender.com/](https://lumae.onrender.com/)

---

## Features

* Upload PDF research papers or notes
* Automatically splits and stores them in Pinecone

*  Asks your questions and gets concise answers with sources from your data
*  Uses Hugging Face for sentence embeddings + Together AI’s LLaMA 3 for answering

* Different RAG strategies: basic similarity search, advanced LangChain chains
* Designed to be easily extendable (supports memory, more loaders, conversational agents)

## License

MIT License.

Feel free to fork, extend, or contribute!
