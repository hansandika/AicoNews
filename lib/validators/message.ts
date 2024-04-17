import { z } from 'zod'

export const MessageSchemaValidator = z.object({
  content: z.string().min(1),
  role: z.enum(['user', 'assistant'])
})


export const ChatValidator = z.object({
  messages: z.array(MessageSchemaValidator),
  languageStyle: z.enum(['formal', 'casual'])
})

export const QuerySchemaValidator = z.string().min(1)
