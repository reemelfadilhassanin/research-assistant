import dotenv from "dotenv";
dotenv.config();

import { Pinecone } from "@pinecone-database/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { TogetherAI } from "@langchain/community/llms/togetherai";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

const embeddings = new HuggingFaceInferenceEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
});

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
});

const together = new TogetherAI({
  apiKey: process.env.TOGETHER_API_KEY,
  model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
});

export async function askQuestion(question: string): Promise<{ answer: string }> {
  console.log("🔍 Searching for relevant context...");
  const results = await vectorStore.similaritySearch(question, 3);

  const context = results.map(doc => doc.pageContent).join("\n---\n");

  const prompt = `
You are a research assistant. Use the following context to answer the question.
If the context does not contain the answer, reply "I don't know."

Context:
${context}

Question: ${question}
Answer: 
  `;

  console.log("Sending prompt to TogetherAI...");
  const response = await together.call(prompt);
  console.log("✅ Got answer:", response);

  return { answer: response };
}
