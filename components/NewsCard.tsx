import React from 'react'
import { NewsInterface } from '@/common.types'
import Link from 'next/link'
import Image from 'next/image'
import NewsDetails from './NewsDetails'

const NewsCard = ({ news }: { news: NewsInterface }) => {
	return (
		<Link href={`news/${news.slug}`} className='md:h-full newsCard'>
			<div>
				<Image src={news.thumbnailUrl} height={360} width={640} alt='News Thumbnail' className='newsThumbnail' />
			</div>
			<NewsDetails news={news} />
		</Link>
	)
}

export default NewsCard