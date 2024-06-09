import { NewsInterface } from '@/common.types';
import LoadMore from '@/components/LoadMore';
import NewsCarousel from '@/components/NewsCarousel';
import NewsListItem from '@/components/NewsListItem';
import { getNewsPagination } from '@/lib/action';

export const revalidate = 3600;

const News = async () => {
	const newsCollection = await getNewsPagination(2, 4) as NewsInterface[];
	return (
		<div className='flexCenter flex-col mb-8 gap-y-3'>
			<NewsCarousel />
			<section className='newsList'>
				{newsCollection.map((news, index) => (
					<NewsListItem
						news={news}
						key={news.id}
						index={index}
					/>
				))}
			</section>
			<LoadMore />
		</div>
	);
};

export default News;
