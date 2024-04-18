import { NewsInterface } from '@/common.types';
import React from 'react';
import { Separator } from './ui/separator';
import NewsItem from './NewsItem';
import { cn } from '@/lib/utils';

interface newsProps {
	newsItems: NewsInterface[];
	className?: string;
}

function LatestNews({ newsItems, className }: newsProps) {
	return (
		<div className={cn('lg:py-5 xl:py-0 flex flex-col', className)}>
			<div>
				<h3 className='text-[1.5rem] lg:text-[1.25rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2'>
					Latest
				</h3>
				<Separator className='bg-blue-primary dark:bg-blue-primary-dark' />
			</div>
			<div className='flex w-full flex-col pt-3 sm:pt-5 grow gap-2'>
				{newsItems.map((newsItem, index) => {
					return (
						<div key={index}>
							<NewsItem
								key={index}
								{...newsItem}
							/>
							{index === newsItems.length - 1 ? (
								<></>
							) : (
								<div className='py-3 xl:py-1 '>
									<Separator className='bg-black-tertiary h-[1px]' />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LatestNews;
