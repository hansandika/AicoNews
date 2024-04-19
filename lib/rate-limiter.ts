import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'
import { RateLimitRequestPerDay } from '@/constants'

export const rateLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(RateLimitRequestPerDay, '1 d'),
	prefix: '@upstash/ratelimit'
})