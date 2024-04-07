import React from 'react'
import { NewsInstance } from '@/common.types'
import Link from 'next/link'
import Image from 'next/image'
import NewsDetails from './NewsDetails'

const NewsCard = ({news}: {news: NewsInstance}) => {
  return (
    <div className="newsCard">
      <Link href={`news/${news.slug}`} className="h-[160px] md:h-full">
        <div>
          <Image src={news.thumbnailUrl} height={360} width={640} alt="News Thumbnail" className="newsThumbnail"/>
        </div>
      </Link>
      <NewsDetails news={news} showContentPreview={true}/>
    </div>
  )
}

export default NewsCard