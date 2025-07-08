// ragqa.ts
import dotenv from "dotenv";
dotenv.config();
import { Pinecone } from "@pinecone-database/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { BufferMemory } from "langchain/memory";
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX);
// Create a single memory instance to keep conversation history across calls
const memory = new BufferMemory({
    returnMessages: false, // plain text history
    memoryKey: "history",
});
export async function askQuestion(question) {
    console.log("🔍 Starting retrieval...");
    // Load embeddings and vectorstore
    const embeddings = new HuggingFaceInferenceEmbeddings({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        apiKey: process.env.HUGGINGFACEHUB_API_KEY,
    });
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
    });
    // Retrieve top 10 relevant docs
    const retriever = vectorStore.asRetriever({ k: 10 });
    const retrievedDocs = await retriever.invoke(question);
    console.log("✅ Retrieved context from Pinecone.");
    // Get conversation history from memory
    const history = (await memory.loadMemoryVariables({}))["history"] || "";
    // Compose prompt including history + context + question
    const prompt = `
You are an assistant with memory. Use the conversation history and context to answer the question.
Conversation History:
${history}

Context:
${retrievedDocs.map(doc => doc.pageContent).join("\n---\n")}

Question: ${question}
Answer:
`;
    // TogetherAI model call
    const model = new TogetherAI({
        apiKey: process.env.TOGETHER_API_KEY,
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    });
    const response = await model.call(prompt);
    // Save current question and answer to memory
    await memory.saveContext({ input: question }, { output: response });
    console.log("✅ Answer:", response);
    return { answer: response, retrievedDocs };
}
