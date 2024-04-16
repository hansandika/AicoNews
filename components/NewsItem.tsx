import { NewsInterface } from "@/common.types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function NewsItem({
	slug,
	headline,
	source,
	publishedDate,
}: NewsInterface) {
	return (
		<Link href={`/news/${slug}`}>
			<h3 className="text-[1rem] font-medium hover:underline">{headline}</h3>
			<div className="py-1 flex gap-2 items-center font-light text-[0.75rem] text-black-secondary">
				<p>
					{source} • {formatDate(publishedDate)}
				</p>
			</div>
		</Link>
	);
}

export default NewsItem;
