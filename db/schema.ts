import { relations } from "drizzle-orm";
import { pgEnum, integer, text, pgTable, serial, varchar, timestamp, jsonb, uuid, date } from "drizzle-orm/pg-core";

// Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  avatarUrl: text("avatar_url").notNull(),
  provider: varchar("provider", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const SourceEnum = pgEnum('source', ['investing', 'cnbc', 'cnn'])

export const news = pgTable("news", {
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

export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull()
    .references(() => users.id),
  newsId: uuid("news_id").notNull()
    .references(() => news.id),
  message: jsonb("message").notNull().default([{}]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  chatHistory: many(chatHistory)
}))

export const newsRelations = relations(news, ({ many }) => ({
  chatHistory: many(chatHistory)
}))

export const chatHistoryRelations = relations(chatHistory, ({ one }) => ({
  user: one(users),
  news: one(news)
}))