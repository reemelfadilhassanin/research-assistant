import dotenv from "dotenv";
dotenv.config();

import { Pinecone } from "@pinecone-database/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

// ✅ Init Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

export async function askQuestion(question: string) {
  console.log("🔍 Starting retrieval...");

  // ✅ HuggingFace embeddings
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  const retriever = vectorStore.asRetriever({ k: 10 });
  const retrievedDocs = await retriever.invoke(question);

  console.log("✅ Retrieved context from Pinecone.");

  // ✅ TogetherAI as LLM
  const model = new TogetherAI({
    apiKey: process.env.TOGETHER_API_KEY!,
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["human",
    `You are an assistant for question-answering. Use the following context to answer.
If unknown, say you don't know. Answer in max three sentences.
Question: {question}
Context: {context}
Answer:`]
  ]);

  const ragChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
    outputParser: new StringOutputParser(),
  });

  console.log("💭 Sending to TogetherAI...");
  const result = await ragChain.invoke({
    question,
    context: retrievedDocs,
  });

  console.log("✅ Answer:", result);

  return { answer: result, retrievedDocs };
}
