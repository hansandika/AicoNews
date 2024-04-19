import { User, Session } from 'next-auth';

export interface ChatMessage {
	content: string;
	role: 'human' | 'AI';
}

export type ChatHistory = ChatMessage[];

export type ChatHistoryDatabase = {
	userId: string;
	newsId: string;
	message: string;
	createdAt: Date;
};

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	avatarUrl: string;
	provider: string;
}

export interface NewsInterface {
	slug: string;
	thumbnailUrl: string;
	headline: string;
	authorName: string;
	publishedDate: Date;
	sourceUrl: string;
	source: 'Investing' | 'CNBC' | 'CNN';
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
		image: string;
	};
}

export interface RelatedNewsInterace {
	slug: string;
	headline: string;
	content: string;
	date: Date;
	source: string;
}