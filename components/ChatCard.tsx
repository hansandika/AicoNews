'use client';

import { useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel
} from '@/components/ui/select'
import { FaWandMagicSparkles } from 'react-icons/fa6';
import DeleteChat from './DeleteChat';
import { LanguageStyle } from '@/constants';
import Chat from './Chat';
import { NewsInterface, SessionInterface } from '@/common.types';

interface ChatCardProps {
  news: NewsInterface;
  session: SessionInterface;
  slug: string;
}

const ChatCard = ({ news, session, slug }: ChatCardProps) => {
	const [languageStyle, setLanguageStyle] = useState<LanguageStyle>(LanguageStyle.CASUAL);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className='fixed z-10 p-3 transition rounded shadow-sm bg-black-primary dark:bg-white right-10 bottom-10 hover:scale-90'>
					<FaWandMagicSparkles
						size={24}
						className='text-white dark:text-black-primary'
					/>
				</div>
			</SheetTrigger>
			<SheetContent className='w-[300px] md:w-[800px] lg:w-[1700px]'>
				<SheetHeader className='h-full'>
					<div className='my-4 flex justify-between items-center pt-4'>
						<SheetTitle className='text-left '>AI Assistant</SheetTitle>
						<Select value={languageStyle} onValueChange={(value: LanguageStyle) => setLanguageStyle(value)}>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Preferences' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Preferences</SelectLabel>
									<SelectItem value={LanguageStyle.CASUAL}>Casual</SelectItem>
									<SelectItem value={LanguageStyle.FORMAL}>Formal</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<DeleteChat
							slug={slug}
							session={session}
						/>
					</div>
					<SheetDescription>
            Chat with our AI assistant to get more information about this news
					</SheetDescription>
					<div className='h-full'>
						<Chat
							news={news}
							session={session}
							languageStyle={languageStyle}
						/>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default ChatCard