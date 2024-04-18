export const saveChatHistoryRequest = async (botResponse: string, userInput: string, slug: string) => {
	await fetch('/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ botResponse: botResponse, userInput, slug }),
	})
}