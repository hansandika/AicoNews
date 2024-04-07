import ShareIcon from '@/components/ShareIcon';
import { NEXTAUTH_URL } from '@/constants/env_var';
import { news } from '@/db/schema';
import { getNewsBySlug } from '@/lib/action'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import parse from 'html-react-parser';
import { getFormattedDate } from '@/lib/utils';

const NewsDetail = async ({ params: { slug } }: { params: { slug: string } }) => {
  const newsSlug = await getNewsBySlug(slug);
  const host = NEXTAUTH_URL;

  if (!newsSlug) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="w-full h-64 md:h-96 relative">
        <Image src={newsSlug.thumbnailUrl} fill alt="news-thumbnail" className="object-cover object-center" />
      </div>
      <section className="py-4 md:py-8 bg-blue-primary w-full text-white ">
        <div className="container flex flex-col gap-2 md:gap-4">
          <h1 className="capitalize text-lg md:text-2xl font-semibold">{newsSlug.headline}</h1>
          <div className="flex items-center gap-2 text-sm font-light">
            <p>{newsSlug.authorName} - <span className="capitalize">{newsSlug.source}</span> • {getFormattedDate(newsSlug.publishedDate)}</p>
          </div>
        </div>
      </section>
      <div className="flex py-8 md:py-12 container flex-wrap">
        <ShareIcon url={`${host}/news/${slug}`} hashtag={newsSlug.categoryName} quote={newsSlug.headline} />
        <article className="prose prose-xl prose-headings:underline prose-a:text-blue-600 order-1 md:order-2">
          {parse(parse(newsSlug.contentHtml) as string)}
        </article>
        <div className=''>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail