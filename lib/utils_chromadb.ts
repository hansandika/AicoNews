'use server';

import {
	ChatHistory,
	RelatedNewsInterace,
} from '@/common.types';
import {
	CHROMADB_COLLECTION_NAME,
	CHROMADB_HOST,
	CHROMADB_OPENAI_MODEL,
	OPENAI_API_KEY,
} from '@/constants/env_var';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { Document, DocumentInterface } from '@langchain/core/documents';
import { OpenAIEmbeddings } from '@langchain/openai';

const combinePageContent = (documents: Document[]): string => {
	let combinedContent: string = '';
	for (const doc of documents) {
		combinedContent += doc.pageContent + '\n';
	}

	combinedContent = 'NEWS RESULT: ' + combinedContent;
	return combinedContent;
};

export const serializeChatHistory = (chatHistory: ChatHistory): string =>
	chatHistory
		.map((chatMessage) => {
			if (chatMessage.role === 'human') {
				return `Human: ${chatMessage.content}`;
			} else if (chatMessage.role === 'AI') {
				return `Assistant: ${chatMessage.content}`;
			} else {
				return `${chatMessage.content}`;
			}
		})
		.join('\n');

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
	let cleanedString = inputString.replace(/\n/g, ' ');
	// Remove quotation marks
	// eslint-disable-next-line no-useless-escape
	cleanedString = cleanedString.replace(/\"/g, '');
	return cleanedString;
};

const combineRelatedResult = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	documents: DocumentInterface<Record<string, any>>[]
): Promise<RelatedNewsInterace[]> => {
	const result: RelatedNewsInterace[] = [];

	// group the result based on metadata slug
	documents.forEach((doc) => {
		const metadata = doc.metadata;
		const slug = metadata.slug as string;
		const index = result.findIndex(e => e.slug === slug);
		if (index !== -1) {
			result[index].content += cleanNewsString(doc.pageContent);
		} else {
			result.push({
				slug: slug,
				headline: metadata.headline as string,
				content: cleanNewsString(doc.pageContent),
				date: metadata.publishedDate as Date,
				source: metadata.source as string,
			})
		}
	});

	return result
};

export const retrieveNewsWithGrouping = async (query: string): Promise<RelatedNewsInterace[]> => {
	const vectorStore = await Chroma.fromExistingCollection(
		new OpenAIEmbeddings({
			openAIApiKey: OPENAI_API_KEY,
			modelName: CHROMADB_OPENAI_MODEL,
		}),
		{ collectionName: CHROMADB_COLLECTION_NAME, url: CHROMADB_HOST }
	);

	const result = await vectorStore.similaritySearchWithScore(query, 5);

	// Filter documents with similarity score less than 1.5
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const documents: DocumentInterface<Record<string, any>>[] = result.filter(doc => doc[1] < 1.5).map(doc => doc[0]);

	const combinedResult = await combineRelatedResult(documents);
	return combinedResult;
};
