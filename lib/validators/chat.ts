import { z } from 'zod'

export const SaveChatHistoryValidator = z.object({
	botResponse: z.string().min(1),
	userInput: z.string().min(1),
	slug: z.string().min(1)
})
