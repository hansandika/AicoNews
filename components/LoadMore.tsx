"use client"

import { News } from "@/common.types";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useInView } from "react-intersection-observer";
import NewsListItem from "./NewsListItem";
import fetchNews from "./LoadHelper";

let page = 2
let moreAvailable = true

const LoadMore = () => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<News[]>([]);

  useEffect(() => {
    if(inView){
      fetchNews(page).then((res) => {
        setData([...data, ...res]);
        page++;
        if(res.length < data.length) moreAvailable = false;
      });
    }
  }, [inView])
  return (
    <>
      <section className='newsList'>
        {data.map((news) => (
            <NewsListItem news={news} key={news.id}/>
        ))}
        { moreAvailable && data.length % 2 != 0 && <NewsListItem key={'skeleton-3'}/>}
      </section>
      <section className="w-full">
        {moreAvailable && (
          <div ref={ref} className="flexCenter flex-col">
            <div className="newsList">
              <NewsListItem key={'skeleton-1'}/>
              <NewsListItem key={'skeleton-2'}/>
            </div>
            <CgSpinner className="animate-spin my-8" fontSize={40}/>
          </div>
        )}
      </section>
    </>
  )
}

export default LoadMore