"use server";

import { ChatHistory, RelatedNewsInterface } from "@/common.types";
import {
	CHROMADB_COLLECTION_NAME,
	CHROMADB_HOST,
	CHROMADB_OPENAI_MODEL,
	OPENAI_API_KEY,
} from "@/constants/env_var";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document, DocumentInterface } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";

const combinePageContent = (documents: Document[]): string => {
	let combinedContent: string = "";
	for (const doc of documents) {
		combinedContent += doc.pageContent + "\n";
	}

	combinedContent = "NEWS RESULT: " + combinedContent;
	return combinedContent;
};

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

export const retrieveNews = async (query: string, slug: string) => {
	const vectorStore = await Chroma.fromExistingCollection(
		new OpenAIEmbeddings({
			openAIApiKey: OPENAI_API_KEY,
			modelName: CHROMADB_OPENAI_MODEL,
		}),
		{ collectionName: CHROMADB_COLLECTION_NAME, url: CHROMADB_HOST }
	);

	const result = await vectorStore.similaritySearch(query, 3, {
		slug: slug as string,
	});

	const combinedContent = combinePageContent(result);
	return combinedContent;
};

const cleanNewsString = (inputString: string) => {
	// Remove newline characters
	let cleanedString = inputString.replace(/\n/g, " ");
	// Remove quotation marks
	cleanedString = cleanedString.replace(/\"/g, "");
	return cleanedString;
};

const combineRelatedResult = (
	documents: DocumentInterface<Record<string, any>>[]
): RelatedNewsInterface[] => {
	const result: Record<string, string> = {};

	// group the result based on metadata slug
	documents.forEach((doc) => {
		const metadata = doc.metadata;
		const slug = metadata.slug as string;
		if (result[slug]) {
			result[slug] += doc.pageContent;
		} else {
			result[slug] = doc.pageContent;
		}
	});

	const relatedNews: RelatedNewsInterface[] = Object.keys(result).map(
		(slug) => {
			return {
				slug: slug,
				content: cleanNewsString(result[slug]),
			};
		}
	);

	return relatedNews;
};

export const retrieveNewsWithGrouping = async (query: string) => {
	const vectorStore = await Chroma.fromExistingCollection(
		new OpenAIEmbeddings({
			openAIApiKey: OPENAI_API_KEY,
			modelName: CHROMADB_OPENAI_MODEL,
		}),
		{ collectionName: CHROMADB_COLLECTION_NAME, url: CHROMADB_HOST }
	);

	const result = await vectorStore.similaritySearch(query, 5);

	const documents = result as DocumentInterface<Record<string, any>>[];
	const combinedResult = combineRelatedResult(documents);
	return combinedResult;
};
