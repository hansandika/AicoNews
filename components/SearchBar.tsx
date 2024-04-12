"use client";

import * as React from "react";
import useSWR, { Fetcher } from "swr";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/use-debounce";
import Link from "next/link";

function truncate(text: string) {
	const maxLength = 200;
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + "...";
	} else {
		return text;
	}
}

const fetcher = async (url: string, query: string) => {
	if (query === "") return;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
		}),
	}).then((res) => res.json());
};

const SearchBar = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [inputValue, setInputValue] = React.useState("");
	const [value, setValue] = useState("");
	const [pages, setPages] = React.useState<string[]>(["home"]);
	const activePage = pages[pages.length - 1];
	const isHome = activePage === "home";

	const [open, setOpen] = React.useState(false);

	const popPage = React.useCallback(() => {
		setPages((pages) => {
			const x = [...pages];
			x.splice(-1, 1);
			return x;
		});
	}, []);

	const onKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			if (isHome || inputValue.length) {
				return;
			}

			if (e.key === "Backspace") {
				e.preventDefault();
				popPage();
			}
		},
		[inputValue.length, isHome, popPage]
	);

	// Toggle the menu when ⌘K is pressed
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	function bounce() {
		if (ref.current) {
			ref.current.style.transform = "scale(0.96)";
			setTimeout(() => {
				if (ref.current) {
					ref.current.style.transform = "";
				}
			}, 100);

			setInputValue("");
		}
	}

	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={() => setOpen(!open)}
			>
				<Button
					variant="search"
					onClick={() => setOpen(!open)}
				>
					Search
				</Button>
				<DialogContent className="overflow-hidden p-0 shadow-lg bg-transparent border-none">
					<div className="vercel">
						<Command
							shouldFilter={false}
							ref={ref}
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === "Enter") {
									bounce();
								}

								if (isHome || inputValue.length) {
									return;
								}

								if (e.key === "Backspace") {
									e.preventDefault();
									popPage();
									bounce();
								}
							}}
						>
							<div>
								{pages.map((p) => (
									<div
										key={p}
										cmdk-vercel-badge=""
									>
										{p}
									</div>
								))}
							</div>
							<Command.Input
								autoFocus
								placeholder="What do you need?"
								onValueChange={(value) => {
									setInputValue(value);
								}}
							/>
							<Command.List>
								{activePage === "home" && <Home input={inputValue} />}
							</Command.List>
						</Command>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

interface HomeProps {
	input: string;
}

function Home({ input }: HomeProps) {
	const url = "/api/news";
	const debouncedSearch = useDebounce(input, 500);
	const { data, error, isLoading, isValidating }: any = useSWR(
		{ url, debouncedSearch },
		() => fetcher(url, debouncedSearch),
		{
			refreshInterval: 1000 * 3600,
			keepPreviousData: false,
		}
	);
	return (
		<>
			{isLoading && <div>Loading ser...</div>}
			{!data && <div>No news ser...</div>}
			{data && (
				<Command.Group heading="Related News">
					{data.relatedNews.map((item: any) => {
						return (
							<div className="py-1">
								<Item>
									<Link href={`/news/${item.slug}`}>
										<div className="text-[1rem] font-medium mb-2">
											{item.slug}
										</div>
										<div className="text-[0.75rem] font-normal">
											{truncate(item.content)}
										</div>
									</Link>
								</Item>
							</div>
						);
					})}
				</Command.Group>
			)}
		</>
	);
}

function Item({
	children,
	shortcut,
	onSelect = () => {},
}: {
	children: React.ReactNode;
	shortcut?: string;
	onSelect?: (value: string) => void;
}) {
	return (
		<Command.Item onSelect={onSelect}>
			{children}
			{shortcut && (
				<div cmdk-vercel-shortcuts="">
					{shortcut.split(" ").map((key) => {
						return <kbd key={key}>{key}</kbd>;
					})}
				</div>
			)}
		</Command.Item>
	);
}

export default SearchBar;
