import { ChatHistory } from "@/common.types";
import { CHROMADB_COLLECTION_NAME, CHROMADB_HOST, OPENAI_API_KEY } from "@/constants/env_var";
import { ChromaClient, OpenAIEmbeddingFunction, QueryResponse } from "chromadb";

const combinePageContent = (documents: string[]): string => {
  let combinedContent: string = "";
  for (const doc of documents) {
    combinedContent += doc + "\n";
  }

  combinedContent = "NEWS RESULT: " + combinedContent;
  return combinedContent;
}

export const serializeChatHistory = (chatHistory: ChatHistory): string =>
  chatHistory
    .map((chatMessage) => {
      if (chatMessage.type === "human") {
        return `Human: ${chatMessage.message}`;
      } else if (chatMessage.type === "AI") {
        return `Assistant: ${chatMessage.message}`;
      } else {
        return `${chatMessage.message}`;
      }
    })
    .join("\n");

export const retrieveNews = async (query: string, slug?: string) => {
  const client = new ChromaClient({
    path: CHROMADB_HOST as string,
  });
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: OPENAI_API_KEY as string,
    openai_model: "text-embedding-3-small",
  });
  const collection = await client.getOrCreateCollection({
    name: CHROMADB_COLLECTION_NAME as string,
    embeddingFunction: embedder,
  });

  let result: QueryResponse;
  if (slug) {
    result = await collection.query({
      queryTexts: query,
      where: { "slug": slug },
      nResults: 3,
    })
  } else {
    result = await collection.query({
      queryTexts: query,
      nResults: 3,
    })
  }

  const documents = result.documents[0] as string[];
  const combinedContent = combinePageContent(documents);
  return combinedContent;
};
