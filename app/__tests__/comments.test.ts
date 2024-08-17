describe('Comments API Integration Tests', () => {
	const serverUrl = 'http://localhost:3000';
	const validSlug = 'harris-has-a-plan-to-fix-one-of-americas-biggest-economic-problems-heres-what-it-means-for-you';
	const invalidSlug = 'invalid-slug';

	it('POST /api/comments/:slug should add a comment and return 201', async () => {
		const requestBody = { message: 'This is a test comment' };

		const response = await fetch(`${serverUrl}/api/comments/${validSlug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(201);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'Comment added successfully');
	});

	it('POST /api/comments/:slug should return 400 for invalid comment data', async () => {
		const requestBody = {}; // Missing message field

		const response = await fetch(`${serverUrl}/api/comments/${validSlug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(400);
		const data = await response.json();
		expect(data).toHaveProperty('error');
	});

	it('POST /api/comments/:slug should return 404 if news is not found', async () => {
		const requestBody = { message: 'This is a test comment' };

		const response = await fetch(`${serverUrl}/api/comments/${invalidSlug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'News Not Found');
	});

	it('GET /api/comments/:slug should return comments for a valid slug', async () => {
		const response = await fetch(`${serverUrl}/api/comments/${validSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(Array.isArray(data)).toBe(true);
	});

	it('GET /api/comments/:slug should return 404 for an invalid slug', async () => {
		const response = await fetch(`${serverUrl}/api/comments/${invalidSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toHaveProperty('message', 'Comments Not Found');
	});

	it('DELETE /api/comments/:id should delete a comment and return 200', async () => {
		const response = await fetch(`${serverUrl}/api/comments/${validSlug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(response.status).toBe(200);
		const data = await response.json();

		const deleteResponse = await fetch(`${serverUrl}/api/comments/${validSlug}/${data[0].id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		expect(deleteResponse.status).toBe(200);
		const deleteData = await deleteResponse.json();
		expect(deleteData).toHaveProperty('message', 'Delete Comment Is Successfull');
	});
});
