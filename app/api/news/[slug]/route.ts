import { getUserChatResponse } from '@/lib/chatbot_action';
import { getCurrentUser } from '@/lib/session';
import { ChatValidator } from '@/lib/validators/message';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import { fromZodError } from 'zod-validation-error';

export async function POST(request: Request, { params }: { params: { slug: string } }) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}
	const req = await request.json();

	const chatValidation = ChatValidator.safeParse(req);
	if (!chatValidation.success) {
		const errorValidation = fromZodError(chatValidation.error)
		return new Response(JSON.stringify({ error: errorValidation }), { status: 400 });
	}

	const { messages, languageStyle } = req;

	const lastMessage: ChatCompletionMessage[] = messages.slice(-6);
	const response = await getUserChatResponse({
		slug: params.slug,
		messages: lastMessage,
		languageStyle: languageStyle as string
	})

	const stream = OpenAIStream(response)
	return new StreamingTextResponse(stream)
}