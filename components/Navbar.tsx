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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { HiMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthProviders from "./AuthProviders";
import { NavLinks } from "@/constants";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleTheme from "./ToggleTheme";
import { LogOut, Search, Users } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { ComboboxDemo } from "./ComboBox";
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
		<div className="py-4 px-8 flex justify-between items-center max-w-[1400px] mx-auto">
			<Link href="/">
				<Image
					src="/logo.svg"
					width={150}
					height={20}
					alt="logo"
				/>
			</Link>
			<div className="flex items-center gap-8">
				<div className="flex gap-8 font-medium text-[1rem]">
					{NavLinks.map((link) => {
						return (
							<Link
								key={link.text}
								href={link.href}
								className={`w-full rounded-md py-2 ${
									currentPath === link.href
										? "text-blue-primary dark:text-blue-secondary"
										: "text-black-tertiary hover:text-black-secondary"
								}`}
							>
								{link.text}
							</Link>
						);
					})}
				</div>
				<div className="flex items-center gap-6">
					<p className="text-black-secondary">|</p>
					<div>
						<ToggleTheme />
					</div>
					{session?.user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Image
									src={session?.user.image}
									width={40}
									height={40}
									alt="user profile"
									className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />

								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Users className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="cursor-pointer"
									onClick={() => signOut()}
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Dialog>
							<DialogTrigger>
								<Button>Sign In</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="font-semibold text-[1.5rem] text-blue-primary dark:text-blue-primary-dark text-center">
										Sign In to AicoNews
									</DialogTitle>
									<DialogDescription className="text-center pb-5">
										Sign in to access your account.
									</DialogDescription>
									<AuthProviders></AuthProviders>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
		</div>
	) : (
		<div
			className="py-2 sm:py-4 container"
			suppressHydrationWarning
		>
			<div className="">
				<Drawer direction="top">
					<div className="flex justify-between gap-5">
						<div className="flex gap-3 items-center">
							<DrawerTrigger asChild>
								<HiMenuAlt1
									size={24}
									className="cursor-pointer text-blue-primary dark:text-blue-primary-dark"
								/>
							</DrawerTrigger>
							<DrawerContent>
								{session?.user ? (
									<div className="flex p-4 w-full flex-col">
										<div className="flex justify-between items-center">
											<Link href="/">
												<Image
													src="/logo.svg"
													alt="logo"
													width={120}
													height={20}
												/>
											</Link>
											<Image
												src={session?.user.image}
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
														key={link.text}
														href={link.href}
														className={`w-full rounded-md py-2 ${
															currentPath === link.href
																? "text-blue-primary dark:text-blue-primary-dark"
																: "text-black-tertiary hover:text-black-secondary dark:hover:text-blue-primary-dark"
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
										<div className="flex justify-between items-center">
											<Link href="/">
												<Image
													src="/logo.svg"
													alt="logo"
													width={120}
													height={20}
												/>
											</Link>
										</div>
										<div className="mt-5 flex flex-col text-[1.25rem] font-semibold">
											{NavLinks.map((link) => {
												return (
													<Link
														key={link.text}
														href={link.href}
														className={`w-full rounded-md py-2 ${
															currentPath === link.href
																? "text-blue-primary dark:text-blue-primary-dark"
																: "text-black-tertiary hover:text-black-secondary dark:hover:text-blue-primary-dark"
														}`}
													>
														<DrawerClose>{link.text}</DrawerClose>
													</Link>
												);
											})}
										</div>
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
							<Link
								href="/"
								className="relative  w-[120px] h-[32px]"
							>
								<Image
									src="/logo.svg"
									fill
									alt="logo"
								/>
							</Link>
						</div>
						<SearchBar />

						<div className="flex items-center gap-5 shrink-0">
							<div>
								<ToggleTheme />
							</div>
							{session?.user ? (
								<Image
									src={session?.user.avatarUrl}
									width={40}
									height={40}
									alt="user profile"
									className="relative shrink-0 h-10 w-10 overflow-hidden rounded-full"
								/>
							) : (
								<DrawerTrigger asChild>
									<Button>Sign In</Button>
								</DrawerTrigger>
							)}
						</div>
					</div>
				</Drawer>
			</div>
		</div>
	);
};

export default Navbar;
