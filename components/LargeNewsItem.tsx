import Image from "next/image";
import Link from "next/link";
import React from "react";

type LargeNewsItemProps = {};

function LargeNewsItem() {
	return (
		<Link
			href={`/news/${"test"}`}
			className="cursor-pointer"
		>
			<div className="px-5">
				<div className="flex gap-5 w-full">
					<div className="h-[120px] w-[120px] relative flex-shrink-0">
						<Image
							src="/newsitem.avif"
							layout="fill"
							className="object-cover"
							alt="news image"
						/>
					</div>
					<div className="flex flex-col w-full gap-1">
						<h4 className="text-[#075FC5] font-bold text-[1rem]">Category</h4>
						<h5 className="text-[1rem] font-bold hover:underline">
							Goldman, Citi, and Citadel Securities among new partners in
							BlackRock ETF's 'mega absurd success'
						</h5>
						<div className="flex gap-1 text-[0.75rem] text-[#999999]">
							<p>CNN</p>
							<p>• 12 hours ago</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default LargeNewsItem;
