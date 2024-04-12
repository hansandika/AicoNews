import {
	ChatCompletionChunk,
	ChatCompletionMessage,
	ChatCompletionMessageParam,
	ChatCompletionMessageToolCall,
	ChatCompletionTool,
} from "openai/resources/index.mjs";
import { retrieveNews } from "./utils_chromadb";
import OpenAI from "openai";
import { getNewsBySlug } from "./action";
import { OPENAI_API_KEY } from "@/constants/env_var";

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
});

const tools: ChatCompletionTool[] = [
	{
		type: "function",
		function: {
			name: "retrieveNews",
			description: "Get current news based on user questions",
			parameters: {
				type: "object",
				properties: {
					search_query: {
						type: "string",
						description: "search query for news, e.g. 'covid-19 in Indonesia'",
					},
					slug: {
						type: "string",
						description:
							"slug for news if available, e.g. 'covid-19-in-indonesia'",
					},
				},
				required: ["search_query", "slug"],
			},
		},
	},
];

export const getUserChatResponse = async (
	input: { messages: ChatCompletionMessage[]; slug: string },
	configurable: { userId: string }
) => {
	const { messages, slug } = input;
	const { userId } = configurable;

	const newsBySlug = await getNewsBySlug(slug);

	if (!newsBySlug) {
		throw new Error("News not found");
	}

	const sytemMessages: ChatCompletionMessageParam[] = [
		{
			role: "system",
			content: `
					You are an expert financial analyst and journalist. Your task is to answer any questions about financial and economic news.

					If the question is not related to a current event or news, answer it based on your own knowledge. However, if the question pertains to a current event or news, generate a comprehensive and informative answer of 500 words or less. 

					To get current information, events, or news, use the 'newsRetriever' function. This function takes two parameters: 'search_query' and 'slug'. The 'search_query' is the user's question, and the 'slug' is a specific identifier for the news if available. 

					When a 'slug' is provided, it must be used to retrieve the news. If no 'slug' is provided, the 'newsRetriever' function should be used with only the 'search_query'.

					Maintain an unbiased and journalistic tone in your responses. Combine the news results into a coherent answer, stating important data for news readers like significant numbers and statistical data if available. Avoid repeating text and do not fabricate an answer. If you don't know the answer, simply state so.

					slug: ${slug}
				`,
		},
	];

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0125",
		messages: [...sytemMessages, ...messages],
		tools: tools,
		tool_choice: "auto",
		stream: true,
	});

	const [response1, response2] = response.tee();
	let streamChat = "";
	let toolCalls: Array<ChatCompletionMessageToolCall> = [];
	let chatCompletions: Array<ChatCompletionChunk> = [];

	for await (const chatCompletion of response1) {
		let delta = chatCompletion.choices[0]?.delta;

		if (delta && delta.content) {
			streamChat += delta.content;
		} else if (delta && delta.tool_calls) {
			let toolCallChunks = delta.tool_calls;

			for (let toolCallChunk of toolCallChunks) {
				if (toolCalls.length <= toolCallChunk.index) {
					toolCalls.push({
						id: "",
						type: "function",
						function: { name: "", arguments: "" },
					});
				}

				let tc = toolCalls[toolCallChunk.index];

				if (toolCallChunk.id) {
					tc["id"] += toolCallChunk.id;
				}

				if (toolCallChunk?.function?.name) {
					tc["function"]["name"] += toolCallChunk.function.name;
				}

				if (toolCallChunk?.function?.arguments) {
					tc["function"]["arguments"] += toolCallChunk.function.arguments;
				}
			}
		}
		chatCompletions.push(chatCompletion);
	}


	sytemMessages.push({ role: "assistant", tool_calls: toolCalls });

	const availableFunctions = {
		retrieveNews: retrieveNews,
	};

	for (const toolCall of toolCalls) {
		const functionName = toolCall.function.name as string;
		const functionToCall =
			availableFunctions[functionName as keyof typeof availableFunctions];
		const functionArgs = JSON.parse(toolCall.function.arguments);
		const functionResponse = await functionToCall(
			functionArgs.search_query,
			functionArgs.slug
		);

		sytemMessages.push({
			tool_call_id: toolCall.id,
			role: "tool",
			content: functionResponse,
		}); // extend conversation with function response

		const secondResponse = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0125",
			messages: [...sytemMessages, ...messages],
			stream: true,
		});

		return secondResponse;
	}

	return response2;
};
