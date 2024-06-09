'use client'
import { NewsInterface } from '@/common.types';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { formatDate } from '@/lib/utils';
import { Suspense } from 'react';
import { easeOut, motion } from 'framer-motion';

type Props = {
	news?: NewsInterface
	index: number
};

const variant = {
	visible: { opacity: 0, y: 100 },
	hidden: { opacity: 1, y: 0 }
}

const NewsListItem = ({ news, index }: Props) => {
	return news && news !== undefined && news.id !== '' ? (
		<motion.div
			variants={variant}
			initial='visible'
			animate='hidden'
			transition={{
				delay: index % 8 * 0.1,
				duration: 0.5,
				ease: easeOut
			}}
		>
			<Link
				href={`news/${news.slug}`}
				className='group flex gap-3 md:gap-5 gap-y-14'
			>
				<Suspense fallback={<Skeleton className='h-[120px] w-[120px] object-cover bg-black-tertiary'></Skeleton>}>
					<Image
						src={news.thumbnailUrl}
						width={100}
						height={100}
						className='aspect-square sm:w-[120px] object-cover rounded-md'
						alt='News Thumbnail'
					/>
				</Suspense>
				<div className='flex flex-col justify-center max-sm:text-sm'>
					<p className='font-semibold text-blue-primary capitalize'>
						{news.categoryName}
					</p>
					<p className='font-medium line-clamp-3 group-hover:underline'>
						{news.headline}
					</p>
					<p className='text-black-secondary'>
						<span>{news.source}</span> • {formatDate(news.publishedDate)}
					</p>
				</div>
			</Link>
		</motion.div>
	) : (
		<motion.div
			variants={variant}
			initial='visible'
			animate='hidden'
			transition={{
				delay: index % 8 * 0.1,
				duration: 0.5,
				ease: easeOut
			}}
			className='flex gap-3 md:gap-5 gap-y-14'>
			<Skeleton className='h-[120px] w-[120px] object-cover bg-black-tertiary' />
			<div className='flex flex-col justify-center gap-2 w-2/3'>
				<Skeleton className='h-4 w-full bg-black-tertiary' />
				<Skeleton className='h-4 w-full bg-black-tertiary' />
				<Skeleton className='h-4 w-full bg-black-tertiary' />
			</div>
		</motion.div>
	);
};

export default NewsListItem;
