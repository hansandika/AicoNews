import { User, Session } from 'next-auth'

export interface ChatMessage {
  message: string;
  type: "human" | "AI";
}

export type ChatHistory = ChatMessage[];

export type ChatHistoryDatabase = {
  userId: string;
  newsId: string;
  message: unknown;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: string;
}

export interface NewsInstance {  
  slug: string;
  thumbnailUrl: string;
  headline: string;
  authorName: string;
  publishedDate: Date;
  sourceUrl: string;
  source: "Investing" | "CNBC" | "CNN";
  content: string;
  id: string;
  createdAt: Date;
  contentHtml: string;
  categoryName: string;
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}
