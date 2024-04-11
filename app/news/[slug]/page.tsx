import ShareIcon from '@/components/ShareIcon';
import { NEXTAUTH_URL } from '@/constants/env_var';
import { getChatHistory, getNewsBySlug, getNewsPagination } from '@/lib/action'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import parse from 'html-react-parser';
import { formatDate } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import NewsItem from '@/components/NewsItem';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getCurrentUser } from '@/lib/session';
import Chat from '@/components/Chat';
import DeleteChat from '@/components/DeleteChat';

const NewsDetail = async ({ params: { slug } }: { params: { slug: string } }) => {
  const newsSlug = await getNewsBySlug(slug);
  const host = NEXTAUTH_URL;
  const newsCollection = await getNewsPagination(1, 5);
  const session = await getCurrentUser();

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
            <p>{newsSlug.authorName} - <span className="capitalize">{newsSlug.source}</span> • {formatDate(newsSlug.publishedDate)}</p>
          </div>
        </div>
      </section>
      <div className="flex py-8 md:py-12 container flex-wrap gap-8">
        <ShareIcon url={`${host}/news/${slug}`} hashtag={newsSlug.categoryName} quote={newsSlug.headline} />
        <article className="prose prose-xl prose-headings:underline prose-a:text-blue-600 dark:prose-invert order-1 md:order-2">
          {parse(parse(newsSlug.contentHtml) as string)}
        </article>
        <div className="order-3 w-full 2xl:w-64">
          <div className='w-full'>
            <h3 className="text-[1.5rem] font-bold text-blue-primary dark:text-blue-primary-dark mb-2">
              Latest
            </h3>
            <Separator className="bg-blue-primary dark:bg-blue-primary-dark" />
          </div>
          <div className="flex flex-col md:py-4 py-6">
            {newsCollection.map((newsItem, index) => {
              return (
                <div key={index}>
                  <NewsItem
                    key={index}
                    {...newsItem}
                  />
                  {index !== newsCollection.length - 1 &&
                    (
                      <div className="py-3">
                        <Separator className="bg-black-tertiary h-[1px]" />
                      </div>
                    )
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {session?.user && (
        <Sheet>
          <SheetTrigger asChild>
            <div className='fixed z-10 p-3 transition rounded shadow-sm bg-black-primary dark:bg-white right-10 bottom-10 hover:scale-90'>
              <FaWandMagicSparkles size={24} className="text-white dark:text-black-primary" />
            </div>
          </SheetTrigger>
          <SheetContent className='w-[300px] md:w-[800px] lg:w-[1700px]'>
            <SheetHeader className='h-full'>
              <SheetTitle className='text-left my-4 flex justify-between items-center pt-4'>
                AI Assistant
                <DeleteChat slug={slug} session={session} />
              </SheetTitle>
              <SheetDescription className='h-full'>
                <Chat news={newsSlug} session={session} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

export default NewsDetail