import { createComment, getNewsBySlug, getNewsCommentBySlug } from '@/lib/action';
import { getCurrentUser } from '@/lib/session';
import { CommentValidator } from '@/lib/validators/message';
import { revalidatePath } from 'next/cache';
import { fromZodError } from 'zod-validation-error';

export async function POST(request: Request, { params }: { params: { slug: string } }) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { slug } = params
	const { message } = await request.json()

	const commentValidation = CommentValidator.safeParse(message);
	if (!commentValidation.success) {
		const errorValidation = fromZodError(commentValidation.error)
		return Response.json({ error: errorValidation }, { status: 400 });
	}

	const newsSlug = await getNewsBySlug(slug as string);
	if (!newsSlug) {
		return Response.json({ 'message': 'News Not Found' }, { status: 404 });
	}

	await createComment(session?.user?.id, newsSlug.id, message);
	revalidatePath(`/api/news/${slug}`)

	return Response.json({ 'message': 'Comment added successfully' }, { status: 201 });
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params
	const comments = await getNewsCommentBySlug(slug as string);

	if (!comments) {
		return Response.json({ 'message': 'Comments Not Found' }, { status: 404 });
	}
	return Response.json(comments, { status: 200 });
}
