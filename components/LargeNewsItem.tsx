import { NewsInterface } from "@/common.types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LargeNewsItem = ({
	source,
	id,
	publishedDate,
	slug,
	thumbnailUrl,
	categoryName,
	headline,
}: NewsInterface) => {
	return (
		<Link
			href={`/news/${slug}`}
			className="cursor-pointer"
		>
			<div className="flex gap-5 w-full">
				<div className="h-[120px] w-[120px] relative flex-shrink-0">
					<Image
						src={thumbnailUrl}
						layout="fill"
						className="object-cover"
						alt="news image"
					/>
				</div>
				<div className="flex flex-col w-full gap-1">
					<h4 className="text-blue-primary dark:text-blue-primary-dark font-bold text-[1rem] capitalize">
						{categoryName}
					</h4>
					<h5 className="text-[1rem] font-bold hover:underline">{headline}</h5>
					<div className="flex gap-1 text-[0.75rem] text-[#999999]">
						<p>
							{source} • {formatDate(publishedDate)}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default LargeNewsItem;
