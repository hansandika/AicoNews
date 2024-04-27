'use client';

import * as React from 'react';
import useSWR from 'swr';
import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import useDebounce from '@/hooks/use-debounce';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import { RelatedNewsInterace } from '@/common.types';
import { useMediaQuery } from '@/hooks/use-media-query';

const truncate = (text: string, maxLength: number) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	} else {
		return text;
	}
};

const fetcher = async (url: string, query: string) => {
	if (query.length === 0) {
		return null;
	}
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: query,
		}),
	}).then((res) => res.json());
};

const SearchBar = () => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [open, setOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width: 500px)');

	const closeSearch = React.useCallback(() => {
		setOpen(false);
		setInputValue('');
	}, []);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	function bounce() {
		if (ref.current) {
			ref.current.style.transform = 'scale(0.96)';
			setTimeout(() => {
				if (ref.current) {
					ref.current.style.transform = '';
				}
			}, 100);

			setInputValue('');
		}
	}

	return (
		<div className='flex w-full'>
			<Dialog
				open={open}
				onOpenChange={() => setOpen(!open)}
			>
				<Button
					className='w-full flex grow justify-between'
					variant='search'
					onClick={() => setOpen(!open)}
				>
					<p>Search</p>
					<FiSearch />
				</Button>
				<DialogContent className='overflow-hidden p-0 shadow-lg bg-transparent border-none px-3 sm:px-5'>
					<div className='vercel'>
						<Command
							shouldFilter={false}
							ref={ref}
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === 'Enter') {
									bounce();
									closeSearch();
								}

								if (inputValue.length) {
									return;
								}

								if (e.key === 'Backspace') {
									e.preventDefault();
									bounce();
								}
							}}
						>
							<Command.Input
								autoFocus
								placeholder='What news are you looking for?'
								value={inputValue}
								onValueChange={(value: string) => {
									setInputValue(value);
								}}
							/>
							<Command.List>
								<NewsResult
									input={inputValue}
									closeSearch={closeSearch}
									isMobile={isMobile}
								/>
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
	closeSearch: () => void;
	isMobile: boolean;
}

const NewsResult = ({ input, closeSearch, isMobile }: HomeProps) => {
	const url = '/api/news';
	const debouncedSearch = useDebounce(input, 500);
	const { data, error, isLoading } = useSWR(
		{ url, debouncedSearch },
		() => fetcher(url, debouncedSearch),
		{
			refreshInterval: 1000 * 3600,
			keepPreviousData: false,
		}
	);

	if (error) {
		return <div className='text-center'>Error fetching news...</div>;
	}

	return (
		<div>
			{!isLoading && !data && (
				<div className='text-center pb-2'>No News Result...</div>
			)}
			{isLoading && (
				<div>
					<div className='mb-4 my-1'>
						<div className='loading loading04 text-[1.75rem] md:text-[2rem] font-semibold text-center'>
							<span>L</span>
							<span>O</span>
							<span>A</span>
							<span>D</span>
							<span>I</span>
							<span>N</span>
							<span>G</span>
							<span>.</span>
							<span>.</span>
							<span>.</span>
						</div>
					</div>
					<div className='flex flex-col gap-7 px-3'>
						<NewsSkeleton />
						<NewsSkeleton />
						<NewsSkeleton />
					</div>
				</div>
			)}
			{data && (
				<Command.Group heading='Related News'>
					{data.relatedNews.map((item: RelatedNewsInterace) => {
						return (
							<div
								className='py-1'
								key={item.slug}
							>
								<Item href={`/news/${item.slug}`}>
									<Link
										href={`/news/${item.slug}`}
										onClick={() => closeSearch()}
									>
										<div
											className={`${isMobile ? 'text-[0.9rem]' : 'text-[1rem]'
												} font-medium mb-2 `}
										>
											{item.headline}
										</div>
										<div className='text-[0.75rem] font-normal'>
											{isMobile
												? truncate(item.content, 90)
												: truncate(item.content, 250)}
										</div>
									</Link>
								</Item>
							</div>
						);
					})}
				</Command.Group>
			)}
		</div>
	);
};

const Item = ({
	children,
	shortcut,
	href,
}: {
	children: React.ReactNode;
	shortcut?: string;
	href?: string;
}) => {
	const router = useRouter();
	const handleSelect = () => {
		if (href) {
			router.push(href);
		}
	};
	return (
		<Command.Item onSelect={handleSelect}>
			{children}
			{shortcut && (
				<div cmdk-vercel-shortcuts=''>
					{shortcut.split(' ').map((key) => {
						return <kbd key={key}>{key}</kbd>;
					})}
				</div>
			)}
		</Command.Item>
	);
};

const NewsSkeleton = () => {
	return (
		<div className='flex flex-col justify-center w-full gap-3'>
			<Skeleton className='h-4 w-full bg-black-tertiary dark:bg-black-secondary' />
			<div className='flex flex-col gap-1 w-[95%]'>
				<Skeleton className='h-2 w-full bg-black-tertiary dark:bg-black-secondary' />
				<Skeleton className='h-2 w-full bg-black-tertiary dark:bg-black-secondary' />
				<Skeleton className='h-2 w-2/3 bg-black-tertiary dark:bg-black-secondary' />
			</div>
		</div>
	);
};

export default SearchBar;
