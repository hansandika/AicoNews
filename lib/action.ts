import db from "@/db"
import { chatHistory, news, users } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "./session"
import { ChatHistory, ChatHistoryDatabase } from "@/common.types"

export const getUser = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  return user
}

export const createUser = async (name: string, email: string, avatarUrl: string, provider: string) => {
  const user = await db.insert(users).values({
    name,
    email,
    avatarUrl,
    provider
  }).returning();

  return user
}

export const getNewsBySlug = async (slug: string) => {
  const newsBySlug = await db.query.news.findFirst({
    where: eq(news.slug, slug)
  })
  return newsBySlug
}

export const getChatHistory = async (slug: string, userId: number) => {
  const news = await getNewsBySlug(slug)

  if (!news) {
    return []
  }

  const chatHistoryDb = await db.query.chatHistory.findFirst({
    where: and(eq(chatHistory.userId, userId), eq(chatHistory.newsId, news.id)),
  }) as ChatHistoryDatabase

  const parsedChatHistory: unknown[] = JSON.parse(chatHistoryDb.message as string);

  const userChatHistory: ChatHistory = parsedChatHistory.map(entry => {
    const { message, type } = entry as { message: string; type: "human" | "AI" };
    return { message, type };
  });

  return userChatHistory
}