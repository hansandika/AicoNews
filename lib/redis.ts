import { Redis } from '@upstash/redis'

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL! as string;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN! as string;

export const redis = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN
})
