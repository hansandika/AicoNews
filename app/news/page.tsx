import LoadMore from '@/components/LoadMore';
import NewsCarousel from '@/components/NewsCarousel'
import NewsListItem from '@/components/NewsListItem';
import { getNewsPagination } from '@/lib/action'

const News = async () => {
  const newsCollection = await getNewsPagination(1, 8);
  return (
    <div className='flexCenter flex-col my-8 gap-y-3'>
      <NewsCarousel />
      <section className='newsList'>
        {newsCollection.map((news) => (
            <NewsListItem news={news} key={news.id}/>
        ))}
      </section>
      <LoadMore />
    </div>
  )
}

export default News
