import { z } from 'zod'

export const UserSchemaValidator = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	image: z.string().optional(),
})
