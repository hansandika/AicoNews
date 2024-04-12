import LoadMore from '@/components/LoadMore';
import NewsCarousel from '@/components/NewsCarousel'
import NewsListItem from '@/components/NewsListItem';
import { getNewsPagination } from '@/lib/action'

export const revalidate = 3600;

const News = async () => {
  const newsCollection = await getNewsPagination(1, 8);
  return (
    <div className='flexCenter flex-col mt-4 mb-8 gap-y-3'>
      <NewsCarousel />
      <section className='newsList'>
        {newsCollection.map((news) => (
          <NewsListItem news={news} key={news.id} />
        ))}
      </section>
      <LoadMore />
    </div>
  )
}

export default News
