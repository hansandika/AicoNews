import { getUserChatResponse } from "@/lib/chatbot_action";
import { getCurrentUser } from "@/lib/session";
import { OpenAIStream, StreamingTextResponse } from 'ai'


export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const session = await getCurrentUser();
  const { message } = await request.json();

  const response = await getUserChatResponse({
    slug: params.slug,
    message: message
  }, {
    userId: session.user.id
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}