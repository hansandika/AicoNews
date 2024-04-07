"use client";

import { SessionInterface } from "@/common.types";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthProviders from "./AuthProviders";
import { Avatar } from "./ui/avatar";
import { NavLinks } from "@/constants";
type NavbarProps = {
	session: SessionInterface;
};

const links = [
	{ path: "/", label: "Home" },
	{ path: "/about", label: "About" },
	{ path: "/blogs", label: "Blogs" },
	{ path: "/contact", label: "Contact" },
];

const Navbar = ({ session }: NavbarProps) => {
	const currentPath = usePathname();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return isDesktop ? (
		<div>Desktop</div>
	) : (
		<div
			className="mx-4 py-4"
			suppressHydrationWarning
		>
			<div className="">
				<Drawer direction="top">
					<div className="flex justify-between">
						<div className="flex gap-3 items-center">
							<DrawerTrigger asChild>
								{/* <div className="flex gap-2"> */}
								<HiMenuAlt1
									size={24}
									className="cursor-pointer text-[#075FC5] dark:text-[#CEE4FD]"
								/>

								{/* </div> */}
							</DrawerTrigger>
							<DrawerContent>
								{session?.user ? (
									<div className="flex p-4 w-full flex-col">
										<div className="flex justify-between items-center">
											<Link href="/">
												<Image
													src="/logo.svg"
													width={120}
													height={20}
													alt="logo"
												/>
											</Link>
											<Image
												src={session?.user.avatarUrl}
												width={40}
												height={40}
												alt="user profile"
												className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
											/>
										</div>
										<div className="mt-5 flex flex-col text-[1.25rem] font-semibold">
											{NavLinks.map((link) => {
												return (
													<Link
														href={link.href}
														className={`w-full rounded-md py-2 ${currentPath === link.href
															? "text-[#075FC5]"
															: "text-[#CCCCCC] hover:text-[#999999]"
															}`}
													>
														<DrawerClose>{link.text}</DrawerClose>
													</Link>
												);
											})}
										</div>
										<div className="pt-4">
											<DrawerFooter>
												<DrawerClose asChild>
													<Button
														variant="destructive"
														onClick={() => {
															signOut();
														}}
														size="none"
													>
														Log out
													</Button>
												</DrawerClose>
											</DrawerFooter>
										</div>
									</div>
								) : (
									<div className="flex flex-col p-4">
										<DrawerHeader>
											<DrawerTitle>Sign In to AicoNews</DrawerTitle>
											<DrawerDescription>
												Sign in to access your account.
											</DrawerDescription>
										</DrawerHeader>

										<DrawerFooter>
											<AuthProviders></AuthProviders>
											<DrawerClose asChild>
												<Button variant="secondary">Cancel</Button>
											</DrawerClose>
										</DrawerFooter>
									</div>
								)}
							</DrawerContent>
							<Link href="/">
								<Image
									src="/logo.svg"
									width={120}
									height={20}
									alt="logo"
								/>
							</Link>
						</div>
						{session?.user ? (
							<Image
								src={session?.user.avatarUrl}
								width={40}
								height={40}
								alt="user profile"
								className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
							/>
						) : (
							<DrawerTrigger asChild>
								<Button>Sign In</Button>
							</DrawerTrigger>
						)}
					</div>
				</Drawer>
			</div>
		</div>
	);
};

export default Navbar;
