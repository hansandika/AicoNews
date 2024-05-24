import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User, Account } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '@/common.types';
import { createUser, getUser } from './action';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/constants/env_var';
import { UserSchemaValidator } from './validators/user';
import { fromZodError } from 'zod-validation-error';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
	],
	jwt: {
		encode: ({ secret, token }) => {
			const encodedToken = jsonwebtoken.sign(
				{
					...token,
					exp: Math.floor(Date.now() / 1000) + 60 * 60,
				},
				secret
			);

			return encodedToken;
		},
		decode: async ({ secret, token }) => {
			const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
			return decodedToken;
		},
	},
	theme: {
		colorScheme: 'light',
		logo: '/logo.png',
	},
	callbacks: {
		async session({ session }) {
			const email = session.user?.email as string;
			try {
				const data = (await getUser(email)) as UserProfile;
				const newSession = {
					...session,
					user: {
						...session.user,
						...data,
					},
				};

				return newSession;
			} catch (error) {
				console.error(error);
				return session;
			}
		},
		async signIn({
			user,
			account,
		}: {
			user: AdapterUser | User;
			account: Account | null;
		}) {
			try {
				const userValidation = UserSchemaValidator.safeParse(user);
				if (!userValidation.success) {
					const errorValidation = fromZodError(userValidation.error)
					console.error(errorValidation)
					return false;
				}

				// get the user if it exists
				const userExists = (await getUser(
					userValidation?.data.email as string
				)) as UserProfile;

				// if it doesn't exist, create it
				if (!userExists?.id) {
					// create the user
					await createUser(
						userValidation?.data?.name as string,
						userValidation?.data?.email as string,
						userValidation?.data?.image as string,
						account?.provider as string
					);
				}

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
};

export async function getCurrentUser() {
	const session = (await getServerSession(authOptions)) as SessionInterface;
	return session;
}
