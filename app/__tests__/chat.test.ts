describe('Chat History API Integration Tests', () => {
	const serverUrl = 'http://localhost:3000';

	const validSlug = 'harris-has-a-plan-to-fix-one-of-americas-biggest-economic-problems-heres-what-it-means-for-you';
	const invalidSlug = 'invalid-slug';

	it('POST /api/chat should save chat history and return 200', async () => {
		const requestBody = {
			botResponse: 'This is a bot response',
			userInput: 'This is a user input',
			slug: validSlug,
		};

		const response = await fetch(`${serverUrl}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Add session cookie or token if necessary
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'Save Chat History Is Successfull');
	});

	it('POST /api/chat should return 400 for invalid data', async () => {
		const requestBody = {
			// Missing required fields like botResponse, userInput, etc.
			slug: validSlug,
		};

		const response = await fetch(`${serverUrl}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Add session cookie or token if necessary
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(400);
		const data = await response.json();
		expect(data).toHaveProperty('error');
	});

	it('GET /api/chat should return 200 with chat history for a valid slug', async () => {
		const response = await fetch(`${serverUrl}/api/chat?slug=${validSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(response.status).toBe(200);
	});

	it('GET /api/chat should return 404 for an invalid slug', async () => {
		const response = await fetch(`${serverUrl}/api/chat?slug=${invalidSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'News Not Found');
	});

	it('DELETE /api/chat should delete chat history and return 200', async () => {
		const requestBody = {
			slug: validSlug,
		};

		const response = await fetch(`${serverUrl}/api/chat`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'Delete Chat History Is Successfull');
	});

	it('DELETE /api/chat should return 404 for an invalid slug', async () => {
		const requestBody = {
			slug: invalidSlug,
		};

		const response = await fetch(`${serverUrl}/api/chat`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				// Add session cookie or token if necessary
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'News Not Found');
	});
});
