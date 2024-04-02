import { User, Session } from 'next-auth'

interface ChatMessage {
  message: string;
  type: "human" | "AI";
}

export type ChatHistory = ChatMessage[];

export type ChatHistoryDatabase = {
  id: number;
  createdAt: Date;
  userId: number;
  newsId: string;
  message: unknown;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  provider: string;
}

export interface SessionInterface extends Session {
  user: User & {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
  };
}
