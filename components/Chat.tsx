'use client'
import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import CopyToClipboard from './CopyToClipboard'
import { SendHorizontalIcon } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { NewsInterface, SessionInterface } from '@/common.types'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import { Message } from 'ai'
import useSWR, { mutate } from 'swr'
import { saveChatHistoryRequest } from '@/lib/chat_action'
import { LanguageStyle } from '@/constants'

interface ChatProps {
	news: NewsInterface;
	session: SessionInterface;
	languageStyle: LanguageStyle;
}

const Chat = ({ news, session, languageStyle }: ChatProps) => {
	const refScrollBar = useRef<HTMLDivElement>(null)
	const refTextArea = useRef<HTMLTextAreaElement>(null)
	const refForm = useRef<HTMLFormElement>(null)

	const getInitialChatHistory = async (URL: string) => {
		const chatHistory = await fetch(URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const chatHistoryData = await chatHistory.json()
		return chatHistoryData
	}

	const { data: initalChatHistory } = useSWR(`/api/chat?slug=${encodeURIComponent(news.slug)}`, getInitialChatHistory)

	const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
		api: `/api/news/${news.slug}`,
		onFinish: async (message: Message) => {
			await saveChatHistoryRequest(message.content, input, news.slug)
			mutate(`/api/chat?slug=${encodeURIComponent(news.slug)}`)
		},
		onError: async (error) => {
			const inputMessage = {
				id: crypto.randomUUID(),
				role: 'user',
				content: input,
			} as Message
			const errorMessage = {
				id: crypto.randomUUID(),
				role: 'assistant',
				content: error.message,
			} as Message

			setMessages([...messages, inputMessage, errorMessage])
			saveChatHistoryRequest(error.message, input, news.slug)
		},
		body: {
			languageStyle: languageStyle,
		},
	})

	useEffect(() => {
		if (refScrollBar.current === null) return
		refScrollBar.current.scrollTo(0, refScrollBar.current.scrollHeight)
	}, [messages])

	useEffect(() => {
		if (!initalChatHistory) return
		setMessages(initalChatHistory)
	}, [initalChatHistory])

	useEffect(() => {
		refTextArea!.current!.style.height = 'auto';
		refTextArea!.current!.style.height = refTextArea!.current!.scrollHeight + 'px';
	}, [input])

	const handleEnterTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
		}
	}

	const lastMessageIsUser = messages[messages.length - 1]?.role === 'user'

	return <div className='flex flex-col h-full'>
		<ScrollArea
			className='mb-2 h-[400px] rounded-md border p-4 flex-auto'
			ref={refScrollBar}
		>
			{messages.map(m => (
				<div key={m.id} className='whitespace-pre-wrap mb-4 justify-end'>
					{m.role === 'user' && (
						<div className='flex items-start justify-end gap-2.5'>
							<Image
								src={session?.user.image}
								width={32}
								height={32}
								alt='user profile'
								className='w-8 h-8 rounded-full order-2'
							/>
							<div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 text-left order-1'>
								<p className='text-sm font-semibold text-gray-900 dark:text-white'>You</p>
								<div className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
									{m.content}
								</div>
							</div>
						</div>
					)}

					{m.role === 'assistant' && (
						<div className='flex items-start justify-start gap-2.5'>
							<Image
								src='/bot.png'
								width={32}
								height={32}
								alt='bot profile'
								className='w-8 h-8 rounded-full' />
							<div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
								<div className='flex justify-between items-center'>
									<p className='text-sm font-semibold text-gray-900 dark:text-white'>Bot</p>
									<CopyToClipboard message={m} className='-mt-1' />
								</div>
								<div className='text-sm font-normal py-2.5 text-gray-900 dark:text-white text-left'>
									{m.content}
								</div>
							</div>
						</div>
					)}
				</div>
			))}

			{isLoading && lastMessageIsUser && (
				<div className='flex items-start gap-2.5'>
					<Image
						src='/bot.png'
						width={32}
						height={32}
						alt='bot profile'
						className='w-8 h-8 rounded-full' />
					<div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
						<div className='flex justify-between items-center'>
							<p className='text-sm font-semibold text-gray-900 dark:text-white'>Bot</p>
						</div>
						<div className='w-full py-2.5 object-cover flex flex-col justify-center gap-2'>
							<Skeleton className='h-4 w-full bg-black-tertiary' />
							<Skeleton className='h-4 w-full bg-black-tertiary' />
							<Skeleton className='h-4 w-3/4 bg-black-tertiary' />
						</div>
					</div>
				</div>
			)}
		</ScrollArea>

		<form onSubmit={handleSubmit} className='relative flex-initial' ref={refForm}>
			<Textarea
				name='message'
				value={input}
				autoFocus
				onChange={handleInputChange}
				disabled={isLoading}
				ref={refTextArea}
				rows={1}
				onKeyDown={handleEnterTextArea}
				placeholder='Ask me anything...'
				className='pr-16 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
			/>
			<Button
				size='icon'
				type='submit'
				variant='secondary'
				disabled={isLoading}
				className='absolute right-4 bottom-1 h-8 w-10'
			>
				<SendHorizontalIcon className='h-5 w-5 text-blue-primary dark:text-white' />
			</Button>
		</form>
	</div>
}

export default Chat