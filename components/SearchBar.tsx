"use client";

import * as React from "react";
import useSWR, { Fetcher } from "swr";

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

type QUERY_KEY = {
	url: string;
	query: string;
};

const fetcher = async (url: string, query: string) =>
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(query),
	}).then((res) => res.json());

const SearchBar = () => {
	const url = "/api/news";
	const [query, setQuery] = useState("");
	const { data, error, isLoading } = useSWR({ url, query }, () =>
		fetcher(url, query)
	);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const openSearch = () => {
		setOpen(true);
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div>
			<input
				type="text"
				onChange={handleFormChange}
				value={value}
			/>

			<div>{data}</div>
		</div>
	);
};

export default SearchBar;
