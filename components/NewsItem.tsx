import Link from "next/link";
import React from "react";

type NewsProps = {
	title: string;
	url: string;
	date: string;
	source: string;
	author: string;
};

function NewsItem({ title, url, date, source, author }: NewsProps) {
	return (
		<Link href={`/news/${url}`}>
			<h3 className="text-[1rem] font-medium hover:underline">{title}</h3>
			<div className="py-1 flex gap-2 items-center font-light text-[0.75rem] text-[#999999]">
				<p>
					{source} • {date}
				</p>
			</div>
		</Link>
	);
}

export default NewsItem;
