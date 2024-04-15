import { NewsInterface } from "@/common.types";
import React from "react";
import { Separator } from "./ui/separator";
import NewsItem from "./NewsItem";

interface newsProps {
	newsItems: NewsInterface[];
}

function LatestNews({ newsItems }: newsProps) {
	return (
		<div className="px-3 sm:px-5 lg:px-0 lg:py-5 xl:py-0 flex flex-col xl:max-w-[320px]">
			<div>
				<h3 className="text-[1.5rem] lg:text-[1.25rem] font-bold text-blue-primary dark:text-blue-primary-dark pb-2">
					Latest
				</h3>
				<Separator className="bg-blue-primary dark:bg-blue-primary-dark" />
			</div>
			<div className="flex w-full flex-col pt-3 sm:pt-5 px-3 sm:px-5 lg:px-0 grow justify-between">
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
								<div className="py-3 xl:py-1 ">
									<Separator className="bg-black-tertiary h-[1px]" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default LatestNews;