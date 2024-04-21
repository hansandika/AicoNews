import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import SubLayout from '../components/SubLayout';
import { getCurrentUser } from '@/lib/session';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'AicoNews',
	description: 'Read financial news',
};

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const revalidate = 3600;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getCurrentUser();

	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<link
				rel='icon'
				href='/favicon.ico'
				sizes='any'
			/>
			<body className={cn('font-sans ', fontSans.variable)}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					enableColorScheme={false}
					disableTransitionOnChange
				>
					<SubLayout session={session}>{children}</SubLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
