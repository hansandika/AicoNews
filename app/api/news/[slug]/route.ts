import { getUserChatResponse } from "@/lib/chatbot_action";
import { getCurrentUser } from "@/lib/session";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const session = await getCurrentUser();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { messages } = await request.json();
  const lastMessage: ChatCompletionMessage[] = messages.slice(-6);

  const response = await getUserChatResponse({
    slug: params.slug,
    messages: lastMessage
  }, {
    userId: session.user.id
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}