import { relations } from "drizzle-orm";
import { pgEnum, integer, text, pgTable, serial, varchar, timestamp, jsonb, uuid, primaryKey } from "drizzle-orm/pg-core";
import { ChatHistory, ChatHistoryDatabase } from "@/common.types"

// Tables
export const usersSchema = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  avatarUrl: text("avatar_url").notNull(),
  provider: varchar("provider", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const SourceEnum = pgEnum('source', ['Investing', 'CNBC', 'CNN'])

export const newsSchema = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  headline: text("headline").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  contentHtml: text("content_html").notNull(),
  source: SourceEnum('source').notNull(),
  sourceUrl: text("source_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  categoryName: varchar("category_name", { length: 100 }).notNull(),
  publishedDate: timestamp("published_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatHistorySchema = pgTable("chat_history", {
  userId: uuid("user_id").notNull()
    .references(() => usersSchema.id),
  newsId: uuid("news_id").notNull()
    .references(() => newsSchema.id),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.newsId] }),
  };
});

// Relations
export const userRelations = relations(usersSchema, ({ many }) => ({
  chatHistory: many(chatHistorySchema)
}))

export const newsRelations = relations(newsSchema, ({ many }) => ({
  chatHistory: many(chatHistorySchema)
}))

export const chatHistoryRelations = relations(chatHistorySchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [chatHistorySchema.userId],
    references: [usersSchema.id]
  }),
  news: one(newsSchema, {
    fields: [chatHistorySchema.newsId],
    references: [newsSchema.id]
  })
}))