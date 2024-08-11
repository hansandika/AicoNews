import { deleteComment } from '@/lib/action';
import { getCurrentUser } from '@/lib/session';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const session = await getCurrentUser();
	if (!session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { id } = params
	await deleteComment(id);
	return Response.json({ 'message': 'Delete Comment Is Successfull' }, { status: 200 });
}