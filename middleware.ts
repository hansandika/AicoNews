import { rateLimiter } from "./lib/rate-limiter";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimitRequestPerDay } from "./constants";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  try {
    const { success } = await rateLimiter.limit(ip)
    if (!success) {
      // Rate limit only 30 requests per day
      return new NextResponse(`Sorry, you have exceeded the rate limit of ${RateLimitRequestPerDay} requests per day.`, { status: 429 })
    }
  } catch (error) {
    return new NextResponse('Sorry, something went wrong processing your message, Please try again later.', { status: 500 })
  }
}

export const config = {
  matcher: [
    '/api/news/:path+'
  ]
};