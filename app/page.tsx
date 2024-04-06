import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import LargeNewsItem from "../components/LargeNewsItem";
import { Separator } from "@/components/ui/separator";
import NewsItem from "@/components/NewsItem";
import { getNewsPagination } from "@/lib/action";
import Script from "next/script";
import { MarketData } from "@/components/MarketData";
import MarketWidgets from "@/components/MarketWidgets";
const Home = async () => {
	const newsItems = [
		{
			title:
				"Taylor Swift, 1,000% returns, and FOMO are driving a $58bn market — are memecoins ruining crypto?",
			url: "taylor-swift-memecoin-skyrockets-200-times-in-a-few-hours",
			date: "April 5, 2024",
			source: "CNN",
			author: "Liam Kelly",
		},
		{
			title:
				"Taylor Swift, 1,000% returns, and FOMO are driving a $58bn market — are memecoins ruining crypto?",
			url: "taylor-swift-memecoin-skyrockets-200-times-in-a-few-hours",
			date: "April 5, 2024",
			source: "CNN",
			author: "Liam Kelly",
		},
		{
			title:
				"Taylor Swift, 1,000% returns, and FOMO are driving a $58bn market — are memecoins ruining crypto?",
			url: "taylor-swift-memecoin-skyrockets-200-times-in-a-few-hours",
			date: "April 5, 2024",
			source: "CNN",
			author: "Liam Kelly",
		},
		{
			title:
				"Taylor Swift, 1,000% returns, and FOMO are driving a $58bn market — are memecoins ruining crypto?",
			url: "taylor-swift-memecoin-skyrockets-200-times-in-a-few-hours",
			date: "April 5, 2024",
			source: "CNN",
			author: "Liam Kelly",
		},
		{
			title:
				"Taylor Swift, 1,000% returns, and FOMO are driving a $58bn market — are memecoins ruining crypto?",
			url: "taylor-swift-memecoin-skyrockets-200-times-in-a-few-hours",
			date: "April 5, 2024",
			source: "CNN",
			author: "Liam Kelly",
		},
	];

	// const news = await getNewsPagination(1, 5);
	// console.log(news);

	const session = await getCurrentUser();
	return (
		<main className="flex w-full flex-col">
			{/* headline */}
			<div>
				<div className="h-[320px] w-full relative">
					<Image
						src="/newsimg-test.avif"
						layout="fill"
						alt="news image"
						className="object-cover"
					/>
				</div>
				<div className="bg-[#075FC5] w-full h-min py-4 px-5">
					<div>
						<h2 className="text-[1.5rem] text-white font-semibold">
							Lawmakers stall digital euro bill, leaving future of €1.2bn
							project uncertain
						</h2>
					</div>
					<div className="pt-4 pb-2 flex items-center justify-between gap-1 text-[0.75rem] text-white">
						<div className="flex gap-3 items-center">
							<Image
								src={session?.user.avatarUrl}
								width={40}
								height={40}
								alt="user profile"
								className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
							/>
							<div className="flex gap-1">
								<p className=" font-medium">William</p>
								<div className="font-light">• CNN</div>
							</div>
						</div>
						<div className="font-light"> April 5, 2024</div>
					</div>
				</div>
			</div>
			{/* Highlights */}
			<div className="flex flex-col gap-5 py-5">
				<LargeNewsItem />
				<LargeNewsItem />
				<LargeNewsItem />
			</div>

			{/* Latest */}
			<div className="px-5">
				<div>
					<h3 className="text-[1.5rem] font-bold text-[#075FC5] pb-2">
						Latest
					</h3>
					{/* <hr className=" bg-[#075FC5]" /> */}
					<Separator className="bg-[#075FC5]"></Separator>
				</div>
				<div className="flex flex-col py-5 px-2">
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
										<Separator className="bg-[#CCC] h-[1px]" />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Markets */}
			<div className="px-5 pb-5">
				<div>
					<h3 className="text-[1.5rem] font-bold text-[#075FC5] pb-2">
						Markets
					</h3>
					{/* <hr className=" bg-[#075FC5]" /> */}
					<Separator className="bg-[#075FC5]"></Separator>
				</div>
				<div className="h-[600px]">
					<MarketWidgets></MarketWidgets>
				</div>
			</div>
		</main>
	);
};

export default Home;
