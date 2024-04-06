import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import LargeNewsItem from "../components/LargeNewsItem";
const Home = async () => {
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
			{/* news item */}
			<div className="flex flex-col gap-5 py-5">
				<LargeNewsItem />
				<LargeNewsItem />
				<LargeNewsItem />
			</div>
		</main>
	);
};

export default Home;
