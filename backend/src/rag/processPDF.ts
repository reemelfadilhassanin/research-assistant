import dotenv from 'dotenv';
dotenv.config();

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

export async function processPDF(filePath: string) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitDocuments(docs);

  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  await vectorStore.addDocuments(chunks);

  console.log('✅ PDF processed and stored successfully.');
}
