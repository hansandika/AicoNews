import { z } from 'zod'

export const UserSchemaValidator = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  emailVerified: z.date().optional(),
})
