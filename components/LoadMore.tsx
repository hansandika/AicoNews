'use client'

import { NewsInterface } from '@/common.types';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useInView } from 'react-intersection-observer';
import NewsListItem from './NewsListItem';
import { getNewsPagination } from '@/lib/action';

const LoadMore = () => {
	const { ref, inView } = useInView();
	const [data, setData] = useState<NewsInterface[]>([]);
	const [page, setPage] = useState(2);
	const [moreAvailable, setMoreAvailable] = useState(true);

	const loadMoreNews = async () => {
		const newsData = await getNewsPagination(page, 8)
		setData([...data, ...newsData]);
		setPage((prev) => prev + 1);
		if (newsData.length < data.length) {
			setMoreAvailable(false);
		}
	}

	useEffect(() => {
		if (inView) {
			loadMoreNews();
		}
	}, [inView])

	return (
		<>
			<section className='newsList'>
				{data.map((news, index) => (
					<NewsListItem news={news} key={news.id} index={index}/>
				))}
				{moreAvailable && data.length % 2 != 0 && <NewsListItem key={'skeleton-3'} index={9}/>}
			</section>
			<section className='w-full'>
				{moreAvailable && (
					<div ref={ref} className='flexCenter flex-col'>
						<div className='newsList'>
							<NewsListItem key={'skeleton-1'} index={10}/>
							<NewsListItem key={'skeleton-2'} index={11}/>
						</div>
						<CgSpinner className='animate-spin my-8' fontSize={40} />
					</div>
				)}
			</section>
		</>
	)
}

export default LoadMore