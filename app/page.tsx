import Image from 'next/image';
import LargeNewsItem from '../components/LargeNewsItem';
import { Separator } from '@/components/ui/separator';
import MarketWidgets from '@/components/MarketWidgets';
import { getNewsPagination } from '@/lib/action';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import LatestNews from '@/components/LatestNews';
import { NewsInterface } from '@/common.types';
const Home = async () => {
	const news = await getNewsPagination(1, 9) as NewsInterface[];

	const headline = news[0];
	const highlightNews = news.slice(1, 4);
	const newsItems = news.slice(4, 9);

	return (
		<div className='lg:container'>
			<div className='lg:pt-5 flex flex-col xl:flex-row xl:gap-8'>
				{/* Highlight */}
				<div>
					<div className='hidden lg:block  pb-5 w-full'>
						<h3 className='text-[1.25rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2'>
							Highlight
						</h3>
						<Separator className='bg-blue-primary dark:bg-blue-primary-dark' />
					</div>

					{/* headline */}
					<div className='flex flex-col lg:flex-row lg:gap-5'>
						<div className='flex flex-col grow min-w-[350px] lg:max-w-[640px] xl:max-w-[520px]'>
							<div className='h-[200px] sm:h-[300px] w-full relative'>
								<Image
									src={`${headline.thumbnailUrl}`}
									fill
									alt='news image'
									className='object-cover'
								/>
							</div>
							<Link
								href={`/news/${headline.slug}`}
								className='bg-blue-primary group w-full  py-2 sm:py-4 lg:py-0 px-3 sm:px-5  lg:flex lg:flex-col lg:grow lg:h-auto lg:justify-center'
							>
								<h2 className='text-[1.25rem] sm:text-[1.5rem] text-white font-semibold lg:mt-2 group-hover:underline'>
									{headline.headline}
								</h2>
								<div className='pt-3 sm:pt-4 mb-3 flex items-center justify-between gap-1 text-[0.75rem] text-white'>
									<div className='flex gap-4 items-center justify-between'>
										<span className='font-medium'>{headline.authorName} • {headline.source} • {formatDate(headline.publishedDate)}</span>
									</div>
								</div>
							</Link>
						</div>

						{/* Highlights */}
						<div className='flex flex-col gap-3 md: sm:gap-5 py-3 lg:py-0 sm:py-5 px-3 sm:px-5 lg:px-0 lg:grow w-full'>
							{highlightNews.map((newsItem, index) => {
								return (
									<LargeNewsItem
										key={index}
										{...newsItem}
									/>
								);
							})}
						</div>
					</div>
				</div>

				{/* Latest */}
				<LatestNews newsItems={newsItems} className='xl:max-w-[320px] px-3 sm:px-5 lg:px-0' />
			</div>

			{/* Markets */}
			<div className='pt-3 xl:pt-5 px-3 sm:px-5 lg:px-0 pb-5 w-full'>
				<div>
					<h3 className='text-[1.5rem] lg:text-[1.25rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2'>
						Markets
					</h3>
					<Separator className='bg-blue-primary dark:bg-blue-primary-dark' />
				</div>
				<div className='h-[600px] '>
					<MarketWidgets />
				</div>
			</div>
		</div>
	);
};

export default Home;
