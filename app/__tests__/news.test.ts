describe('POST /api/news (Integration Test)', () => {
	const serverUrl = 'http://localhost:3000';

	it('should return 200 with related news when query is valid', async () => {
		const response = await fetch(`${serverUrl}/api/news`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: 'economy' }),
		});

		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty('relatedNews');
		expect(Array.isArray(data.relatedNews)).toBe(true);
		expect(data.relatedNews.length).toBeGreaterThan(0);
	});

	it('should return 400 with error message when query is invalid', async () => {
		const response = await fetch(`${serverUrl}/api/news`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: 123 }), // Invalid query type for example
		});

		expect(response.status).toBe(400);

		const data = await response.json();
		expect(data).toHaveProperty('error');
	});
});
