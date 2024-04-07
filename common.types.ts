import { User, Session } from "next-auth";

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
};

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
		image: string;
	};
}

export interface NewsInterface {
	source: "investing" | "cnbc" | "cnn";
	id: string;
	content: string;
	createdAt: Date;
	headline: string;
	slug: string;
	contentHtml: string;
	sourceUrl: string;
	thumbnailUrl: string;
	authorName: string;
	categoryName: string;
	publishedDate: Date;
}
