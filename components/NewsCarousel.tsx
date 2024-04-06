import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation
} from "@/components/ui/carousel"
import { getNewsPagination } from "@/lib/action";
import Link from "next/link";
import Image from "next/image";

const NewsCarousel = async () => {
  const news = await getNewsPagination(1,5);
  return (
    <Carousel className="w-[90vw] max-w-7xl">
      <CarouselContent className="w-full flex-grow">
        {news.map((newsItem) => (
          <CarouselItem key={newsItem.id}>
            <div className="flex max-h-[50vh]">
              <Link href={`news/${newsItem.slug}`} className="w-2/5">
                <div>
                  <Image src={newsItem.thumbnailUrl} height={360} width={640} alt="News Thumbnail" className="min-h-[50vh] object-cover rounded-l-lg"/>
                </div>
              </Link>
                <div className="w-3/5 h-[50vh] flex flex-col gap-6 px-8 py-16 text-wrap bg-blue-primary text-white rounded-r-lg">
                  <Link href={`news/${newsItem.slug}`}>
                    <span className="text-[1.75rem] font-bold">{newsItem.headline}</span>
                  </Link>
                  <div className="flex gap-5 text-xs">
                    <span className="font-semibold">
                    {newsItem.authorName}</span>
                    {newsItem.publishedDate.toDateString()}
                  </div>
                  <div className="text-[1.25rem] max-h-1/3 overflow-clip">
                    <Link href={newsItem.sourceUrl} target="_blank">
                      {newsItem.source}
                    </Link> -- <Link href={`news/${newsItem.slug}`}>
                        {newsItem.content}
                    </Link>
                  </div>
                </div>
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNavigation aria-colcount={news.length}/>
    </Carousel>
  )
}

export default NewsCarousel