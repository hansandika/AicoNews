import { getUserChatResponse } from "@/lib/chatbot_action";
import { OpenAIStream, StreamingTextResponse } from 'ai'

export async function POST(request: Request) {
  const { message } = await request.json();

  // const stream = OpenAIStream(response)
  // return new StreamingTextResponse(stream)
}