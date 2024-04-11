"use client";

import * as React from "react";
import useSWR from "swr";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FiSearch } from "react-icons/fi";
import {
	MailIcon,
	PersonStandingIcon,
	RocketIcon,
	SettingsIcon,
} from "lucide-react";
import { FacebookIcon } from "next-share";

const frameworks = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SearchBar = () => {
	const { data, error, isLoading } = useSWR("/api/news", fetcher);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const openSearch = () => {
		setOpen(true);
	};

	return (
		<>
			<div className="text-sm text-muted-foreground">
				<div className="flex w-full">
					<Button
						variant={"search"}
						className="flex grow justify-between "
						onClick={openSearch}
					>
						<p>Search...</p>
						<FiSearch />
					</Button>
				</div>
			</div>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<FacebookIcon className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<RocketIcon className="mr-2 h-4 w-4" />
							<span>Launch</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<PersonStandingIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<MailIcon className="mr-2 h-4 w-4" />
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<SettingsIcon className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default SearchBar;
