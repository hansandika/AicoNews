import { NewsInterface } from '@/common.types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  news: NewsInterface
  showContentPreview?: boolean
}

const NewsDetails = ({news, showContentPreview}: Props) => {
  return (
    <div className="newsDetails">
      <Link href={`news/${news.slug}`} className="line-clamp-2">
        <span className="sm:text-[1.5rem] text-[1.25rem] font-bold">{news.headline}</span>
      </Link>
      <div className="flexBetween md:justify-normal md:flex gap-5 text-xs">
        <span className="font-semibold">
        {news.authorName} <Link href={news.sourceUrl} target="_blank" className='font-light'>
          • {news.source}
        </Link></span>
        {formatDate(news.publishedDate)}
      </div>
      {showContentPreview && (
        <div className="newsContentPreview">
          <Link href={news.sourceUrl} target="_blank">
            {news.source}
          </Link> -- <Link href={`news/${news.slug}`}>
              {news.content}
          </Link>
        </div>
      )}
    </div>
  )
}

export default NewsDetails