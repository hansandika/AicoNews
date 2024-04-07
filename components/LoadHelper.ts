"use server"

import { getNewsPagination } from "@/lib/action"

const fetchNews = async (page: number) => {
  const res = await getNewsPagination(page, 8);
  return res;
}

export default fetchNews