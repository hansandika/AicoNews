import { NewsInterface } from '@/common.types'
import { formatDate } from '@/lib/utils'
import React from 'react'

type Props = {
	news: NewsInterface
}

const NewsDetails = ({ news }: Props) => {
	return (
		<div className='newsDetails'>
			<h2 className='text-xl md:text-3xl line-clamp-2 sm:line-clamp-3 font-bold'>{news.headline}</h2>
			<div className='flexBetween md:justify-normal md:flex gap-5 text-sm lg:text-base'>
				<p className='font-semibold'>
					{news.authorName} <span className='font-light md:invisible visible'>
						• {news.source}
					</span></p>
				{formatDate(news.publishedDate)}
			</div>
			<div className='newsContentPreview'>
				{news.source} -- {news.content}
			</div>
		</div>
	)
}

export default NewsDetails