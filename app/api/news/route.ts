import { retrieveNewsWithGrouping } from '@/lib/utils_chromadb';
import { QuerySchemaValidator } from '@/lib/validators/message';
import { fromZodError } from 'zod-validation-error';

export async function POST(request: Request) {
	const { query } = await request.json();
	const queryValidation = QuerySchemaValidator.safeParse(query);
	if (!queryValidation.success) {
		const errorValidation = fromZodError(queryValidation.error)
		return Response.json({ error: errorValidation }, { status: 400 });
	}
	const result = await retrieveNewsWithGrouping(query);
	return Response.json({ 'relatedNews': result }, { status: 200 });
}