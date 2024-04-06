import NewsCarousel from '@/components/NewsCarousel'
import { getNewsPagination } from '@/lib/action'
import Image from 'next/image';
import Link from 'next/link';

const News = async () => {
  const news = await getNewsPagination(1, 8);
  return (
    <div className='flexCenter flex-col my-8'>
      <NewsCarousel/>
      <div className='grid grid-cols-2 gap-x-14 gap-y-3 my-24'>
        {news.map((newsItem) => (
          <Link href={`news/${newsItem.slug}`} className='flex gap-5 gap-y-14 max-w-[40vw]'>
            <Image src={newsItem.thumbnailUrl} width={120} height={120} className='min-h-[120px] object-cover' alt='News Thumbnail'/>
            <div className='flex flex-col justify-center'>
              <span className="font-semibold text-blue-primary">{newsItem.categoryName}</span>
              <p>{newsItem.headline}</p>
              {((new Date().getTime() - newsItem.publishedDate.getTime())/3600000).toFixed(0)} hours ago
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default News