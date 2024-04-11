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

interface ChatProps {
  news: NewsInterface;
  session: SessionInterface;
}

const Chat = ({ news, session }: ChatProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const getInitialChatHistory = async (URL: string) => {
    const chatHistory = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const chatHistoryData = await chatHistory.json()
    return chatHistoryData
  }

  const { data: initalChatHistory } = useSWR(`/api/chat?slug=${encodeURIComponent(news.slug)}`, getInitialChatHistory)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: `/api/news/${news.slug}`,
    onFinish: async (message: Message) => {
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botResponse: message.content, userInput: input, slug: news.slug }),
      })
      mutate(`/api/chat?slug=${encodeURIComponent(news.slug)}`)
    },
  })

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    if (!initalChatHistory) return
    setMessages(initalChatHistory)
  }, [initalChatHistory])

  return <div className='flex flex-col h-full'>
    <ScrollArea
      className='mb-2 h-[400px] rounded-md border p-4 flex-auto'
      ref={ref}
    >
      {messages.map(m => (
        <div key={m.id} className='whitespace-pre-wrap mb-4'>
          {m.role === 'user' && (
            <div className='flex items-start gap-2.5 justify-end'>
              <Image
                src={session?.user.image}
                width={32}
                height={32}
                alt="user profile"
                className="w-8 h-8 rounded-full"
              />
              <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
                <p className='text-sm font-semibold text-gray-900 dark:text-white'>You</p>
                <div className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
                  {m.content}
                </div>
              </div>
            </div>
          )}

          {m.role === 'assistant' && (
            <div className='flex items-start gap-2.5 justify-start'>
              <Image
                src='/bot.png'
                width={32}
                height={32}
                alt="bot profile"
                className="w-8 h-8 rounded-full" />
              <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
                <div className='flex justify-between'>
                  <p className='text-sm font-semibold text-gray-900 dark:text-white'>Bot</p>
                  <CopyToClipboard message={m} className='-mt-1' />
                </div>
                <div className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
                  {m.content}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className='flex items-start gap-2.5 justify-start'>
          <Image
            src='/bot.png'
            width={32}
            height={32}
            alt="bot profile"
            className="w-8 h-8 rounded-full" />
          <div className='flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'>
            <div className='flex justify-between'>
              <p className='text-sm font-semibold text-gray-900 dark:text-white'>Bot</p>
            </div>
            <Skeleton className='h-[80px] w-full py-2.5 object-cover bg-black-tertiary' />
          </div>
        </div>
      )}
    </ScrollArea>

    <form onSubmit={handleSubmit} className='relative flex-initial'>
      <Textarea
        name='message'
        value={input}
        autoFocus
        onChange={handleInputChange}
        disabled={isLoading}
        placeholder='Ask me anything...'
        className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
      />
      <Button
        size='icon'
        type='submit'
        variant='secondary'
        disabled={isLoading}
        className='absolute right-1 top-1 h-8 w-10'
      >
        <SendHorizontalIcon className='h-5 w-5 text-blue-primary' />
      </Button>
    </form>
  </div>
}

export default Chat