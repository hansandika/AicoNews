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

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}
