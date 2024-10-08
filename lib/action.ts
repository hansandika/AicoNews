'use server';

import db from '@/db'
import { chatHistorySchema, commentsSchema, newsSchema, usersSchema } from '@/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { ChatHistory, ChatHistoryDatabase, ChatMessage, CommentInterface, NewsInterface } from '@/common.types'
import { Message } from 'ai';

export const getUser = async (email: string) => {
	const user = await db.query.usersSchema.findFirst({
		where: eq(usersSchema.email, email),
	})
	return user;
}

export const createUser = async (name: string, email: string, avatarUrl: string, provider: string) => {
	await db.insert(usersSchema).values({
		name,
		email,
		avatarUrl,
		provider
	});
}

export const createComment = async (userId: string, newsId: string, message: string) => {
	await db.insert(commentsSchema).values({
		userId,
		newsId,
		message
	})
}

export const getNewsBySlug = async (slug: string) => {
	const newsBySlug = await db.query.newsSchema.findFirst({
		where: eq(newsSchema.slug, slug)
	}) as NewsInterface;
	return newsBySlug;
}

export const getNewsPagination = async (page: number, pageSize: number) => {
	const newsPaginate = await db
		.select()
		.from(newsSchema)
		.orderBy(desc(newsSchema.publishedDate))
		.limit(pageSize)
		.offset((page - 1) * pageSize);
	return newsPaginate;
}

export const getNewsCommentBySlug = async (slug: string) => {
	const newsBySlug = await getNewsBySlug(slug)
	if (!newsBySlug) {
		return null
	}

	const comments = await db.query.commentsSchema.findMany({
		where: eq(commentsSchema.newsId, newsBySlug.id),
		with: {
			user: true
		},
		orderBy: desc(commentsSchema.createdAt)
	}) as CommentInterface[]
	return comments
}

export const saveChatHistory = async (chatHistory: ChatHistory, newsId: string, userId: string) => {
	const chatHistoryDb = await db.query.chatHistorySchema.findFirst({
		where: and(eq(chatHistorySchema.userId, userId), eq(chatHistorySchema.newsId, newsId)),
	}) as ChatHistoryDatabase;

	if (chatHistoryDb) {
		const parsedChatHistory: ChatHistory = JSON.parse(chatHistoryDb.message);

		const updatedChatHistory = [...parsedChatHistory, ...chatHistory];

		await db.update(chatHistorySchema)
			.set({ message: JSON.stringify(updatedChatHistory) })
			.where(and(eq(chatHistorySchema.userId, userId), eq(chatHistorySchema.newsId, newsId)));
	} else {

		await db.insert(chatHistorySchema).values({
			userId: userId,
			newsId: newsId,
			message: JSON.stringify(chatHistory),
		});
	}
}

export const getChatHistory = async (newsId: string, userId: string) => {
	const chatHistoryDb = await db.query.chatHistorySchema.findFirst({
		where: and(eq(chatHistorySchema.userId, userId), eq(chatHistorySchema.newsId, newsId)),
	}) as ChatHistoryDatabase;

	if (!chatHistoryDb) return [];

	const parsedChatHistory: ChatHistory = JSON.parse(chatHistoryDb.message);

	const userChatHistory: Message[] = parsedChatHistory.map(entry => {
		const { content, role } = entry as ChatMessage;
		return { content, role: role === 'human' ? 'user' : 'assistant', id: crypto.randomUUID() };
	});

	return userChatHistory
}

export const deleteChatHistory = async (newsId: string, userId: string) => {
	await db.delete(chatHistorySchema)
		.where(and(eq(chatHistorySchema.userId, userId), eq(chatHistorySchema.newsId, newsId)));
}

export const deleteComment = async (commentId: string) => {
	await db.delete(commentsSchema)
		.where(eq(commentsSchema.id, commentId));
}