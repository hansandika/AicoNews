import { NEXTAUTH_SECRET } from '@/constants/env_var';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
	const token = await getToken({ req, secret, raw: true });

	if (token) {
		return NextResponse.json({ token }, { status: 200 });
	}

	return NextResponse.json({ error: 'No token found' }, { status: 401 });
}