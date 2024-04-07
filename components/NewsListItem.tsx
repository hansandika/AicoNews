import { NewsInterface } from "@/common.types";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { formatDate } from "@/lib/utils";

type Props = {
	news?: NewsInterface;
};

const NewsListItem = ({ news }: Props) => {
	return news && news != undefined && news.id != "" ? (
		<Link
			href={`news/${news.slug}`}
			className="group flex gap-3 md:gap-5 gap-y-14"
		>
			<Image
				src={news.thumbnailUrl}
				width={100}
				height={100}
				className="min-h-[100px] sm:min-h-[120px] sm:w-[120px] object-cover rounded-md"
				alt="News Thumbnail"
			/>
			<div className="flex flex-col justify-center max-sm:text-sm">
				<p className="font-semibold text-blue-primary capitalize">
					{news.categoryName}
				</p>
				<p className="font-medium line-clamp-3 group-hover:underline">
					{news.headline}
				</p>
				<p className={"text-black-secondary"}>
					<span>{news.source}</span> • {formatDate(news.publishedDate)}
				</p>
			</div>
		</Link>
	) : (
		<div className="flex gap-5 gap-y-14">
			<Skeleton className="h-[120px] w-[120px] object-cover bg-black-tertiary"></Skeleton>
			<div className="flex flex-col justify-center gap-2">
				<Skeleton className="h-4 w-[300px] bg-black-tertiary"></Skeleton>
				<Skeleton className="h-4 w-[300px] bg-black-tertiary"></Skeleton>
				<Skeleton className="h-4 w-[300px] bg-black-tertiary"></Skeleton>
			</div>
		</div>
	);
};

export default NewsListItem;
