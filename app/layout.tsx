import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "AicoNews",
	description: "Read financial news",
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<link
				rel="icon"
				href="/favicon.ico"
				sizes="any"
			/>
			<body className={cn(" font-sans ", fontSans.variable)}>
				<div className="dark:bg-black">
					<NavbarWrapper />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
