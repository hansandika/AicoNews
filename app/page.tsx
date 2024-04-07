import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import LargeNewsItem from "../components/LargeNewsItem";
import { Separator } from "@/components/ui/separator";
import NewsItem from "@/components/NewsItem";
import MarketWidgets from "@/components/MarketWidgets";
import { getNewsPagination } from "@/lib/action";
import { formatDate } from "@/lib/utils";
const Home = async () => {
	const news = await getNewsPagination(1, 10);

	const headline = news[0];
	const highlightNews = news.slice(1, 4);
	const newsItems = news.slice(4, 10);
	const session = await getCurrentUser();
	return (
		<main className="flex w-full flex-col">
			{/* headline */}
			<div>
				<div className="h-[200px] sm:h-[320px] w-full relative">
					<Image
						src={`${headline.thumbnailUrl}`}
						layout="fill"
						alt="news image"
						className="object-cover"
					/>
				</div>
				<div className="bg-blue-primary w-full h-min py-2 sm:py-4 container ">
					<div>
						<h2 className="text-[1.25rem] sm:text-[1.5rem] text-white font-semibold">
							{headline.headline}
						</h2>
					</div>
					<div className="pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-1 text-[0.75rem] text-white">
						<div className="flex gap-3 items-center">
							{/* <Image
								src={headline.}
								width={40}
								height={40}
								alt="user profile"
								className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
							/> */}
							<div className="flex gap-1">
								<p className=" font-medium">{headline.authorName}</p>
								<div className="font-light">• {headline.source}</div>
							</div>
						</div>
						<div className="font-light">
							{formatDate(headline.publishedDate)}
						</div>
					</div>
				</div>
			</div>
			{/* Highlights */}
			<div className="flex flex-col gap-3 sm:gap-5 py-3 sm:py-5 container">
				{highlightNews.map((newsItem, index) => {
					return (
						<LargeNewsItem
							key={index}
							{...newsItem}
						/>
					);
				})}
			</div>

			{/* Latest */}
			<div className="container">
				<div>
					<h3 className="text-[1.5rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2">
						Latest
					</h3>
					{/* <hr className=" bg-blue-primary" /> */}
					<Separator className="bg-blue-primary dark:bg-blue-primary-dark"></Separator>
				</div>
				<div className="flex flex-col py-3 sm:py-5 px-2">
					{newsItems.map((newsItem, index) => {
						return (
							<div key={index}>
								<NewsItem
									key={index}
									{...newsItem}
								/>
								{index === newsItems.length - 1 ? (
									<></>
								) : (
									<div className="py-3 ">
										<Separator className="bg-black-tertiary h-[1px]" />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Markets */}
			<div className="container pb-5">
				<div>
					<h3 className="text-[1.5rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2">
						Markets
					</h3>
					{/* <hr className=" bg-blue-primary" /> */}
					<Separator className="bg-blue-primary dark:bg-blue-primary-dark"></Separator>
				</div>
				<div className="h-[600px]">
					<MarketWidgets></MarketWidgets>
				</div>
			</div>
		</main>
	);
};

export default Home;
