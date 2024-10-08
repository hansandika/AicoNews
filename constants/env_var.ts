import 'dotenv/config';

export const ENV = process.env.ENV as string;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL as string;

export const DATABASE_URL = (ENV === 'development' ? process.env.DATABASE_URL : process.env.DATABASE_URL_PROD) as string;

export const CHROMADB_HOST = (ENV === 'development' ? process.env.CHROMADB_HOST : process.env.CHROMADB_HOST_PROD) as string;
export const CHROMADB_COLLECTION_NAME = process.env.CHROMADB_COLLECTION_NAME as string;
export const CHROMADB_OPENAI_MODEL = process.env.CHROMADB_OPENAI_MODEL as string;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export const NODE_TEST = process.env.NODE_TEST as string;