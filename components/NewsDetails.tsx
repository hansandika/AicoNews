import { NewsInstance } from '@/common.types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  news: NewsInstance
  showContentPreview?: boolean
}

const NewsDetails = ({news, showContentPreview}: Props) => {
  return (
    <div className="newsDetails">
      <Link href={`news/${news.slug}`} className="line-clamp-2">
        <span className="md:text-[1.75rem] font-bold">{news.headline}</span>
      </Link>
      <div className="flex gap-5 text-xs">
        <span className="font-semibold">
        {news.authorName}</span>
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