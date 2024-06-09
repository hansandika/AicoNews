import * as React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNavigation,
} from '@/components/ui/carousel';
import { getNewsPagination } from '@/lib/action';
import NewsCard from './NewsCard';
import { NewsInterface } from '@/common.types';

const NewsCarousel = async () => {
	const newsCollection = (await getNewsPagination(1, 4)) as NewsInterface[];
	return (
		<Carousel className='w-full lg:container mb-1 md:mb-8 lg:mb-8 '>
			<CarouselContent className='w-full flex-grow'>
				{newsCollection.map((news) => (
					<CarouselItem key={news.id}>
						<NewsCard
							news={news}
							key={news.id}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselNavigation aria-colcount={newsCollection.length} />
		</Carousel>
	);
};

export default NewsCarousel;
