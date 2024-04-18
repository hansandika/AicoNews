import { ChatHistory } from '@/common.types';
import { deleteChatHistory, getChatHistory, getNewsBySlug, saveChatHistory } from '@/lib/action';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { searchParams } = new URL(request.url as string);
	const slug = searchParams.get('slug');
	const newsSlug = await getNewsBySlug(slug as string);
	if (!newsSlug) {
		return Response.json({ 'message': 'News Not Found' }, { status: 404 });
	}

	const chatHistory = await getChatHistory(newsSlug.id, session?.user?.id);
	return Response.json(chatHistory, { status: 200 });
}

export async function POST(request: NextRequest) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { botResponse, userInput, slug } = await request.json();
	const chatHistories: ChatHistory = [
		{
			content: userInput,
			role: 'human',
		},
		{
			content: botResponse,
			role: 'AI',
		}
	]

	const newsSlug = await getNewsBySlug(slug);
	if (!newsSlug) {
		return Response.json({ 'message': 'News Not Found' }, { status: 404 });
	}

	await saveChatHistory(chatHistories, newsSlug.id, session?.user?.id);

	return Response.json({ 'message': 'Save Chat History Is Successfull' }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { slug } = await request.json();
	const newsSlug = await getNewsBySlug(slug);
	if (!newsSlug) {
		return Response.json({ 'message': 'News Not Found' }, { status: 404 });
	}

	await deleteChatHistory(newsSlug.id, session?.user?.id);
	revalidatePath(`/api/news/${slug}`)

	return Response.json({ 'message': 'Delete Chat History Is Successfull' }, { status: 200 });
}