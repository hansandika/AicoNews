import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation
} from "@/components/ui/carousel"
import { getNewsPagination } from "@/lib/action";
import NewsCard from "./NewsCard";
import { NewsInterface } from "@/common.types";

const NewsCarousel = async () => {
  const newsCollection = await getNewsPagination(1,5) as NewsInterface[];
  return (
    <Carousel className="w-full md:container mb-8 md:mb-12">
      <CarouselContent className="w-full flex-grow">
        {newsCollection.map((news) => (
          <CarouselItem key={news.id}>
            <NewsCard news ={news} key={news.id}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNavigation aria-colcount={newsCollection.length}/>
    </Carousel>
  )
}

export default NewsCarousel