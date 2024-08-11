'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SessionInterface } from '@/common.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mutate } from 'swr';

interface AddCommentFormProps {
	slug: string;
	session: SessionInterface;
}

const CHARACTER_LIMIT = 1000;

const AddCommentForm = ({ slug, session }: AddCommentFormProps) => {
	const [comment, setComment] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isOverLimit, setIsOverLimit] = useState<boolean>(false);
	const refTextArea = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (comment.length > CHARACTER_LIMIT) {
			setError(`Comment cannot exceed ${CHARACTER_LIMIT} characters.`);
			setIsOverLimit(true);
			return;
		}

		if (comment.length == 0) {
			setError('Comment cannot be empty')
			return
		}

		setIsLoading(true);
		setError(null);

		const res = await fetch(`/api/comments/${slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: comment }),
		});

		if (res.ok) {
			mutate(`/api/comments/${slug}`);
			setComment('');
			setIsOverLimit(false);
		} else {
			setError('Something went wrong');
		}

		setIsLoading(false);
	};

	const handleEnterTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setComment(value);
		if (value.length > CHARACTER_LIMIT) {
			setIsOverLimit(true);
			setError(`Comment cannot exceed ${CHARACTER_LIMIT} characters.`);
		} else {
			setIsOverLimit(false);
			setError(null);
		}
	};

	useEffect(() => {
		refTextArea.current!.style.height = 'auto';
		refTextArea.current!.style.height = refTextArea.current!.scrollHeight + 'px';
	}, [comment]);

	return (
		<form onSubmit={handleSubmit} className='flex items-start space-x-4 mb-6'>
			<Avatar className='rounded'>
				<AvatarImage
					src={session.user.avatarUrl}
					alt={`${session.user.name}'s profile picture`}
				/>
				<AvatarFallback>{session.user.name.charAt(0).toUpperCase()}</AvatarFallback>
			</Avatar>

			<div className='flex-1'>
				<Textarea
					name='comment'
					value={comment}
					onChange={handleChange}
					disabled={isLoading}
					ref={refTextArea}
					rows={2}
					onKeyDown={handleEnterTextArea}
					placeholder='Ask me anything...'
					className={`mb-4 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500 max-h-[180px] rounded-full md:py-4 md:px-6 ${isOverLimit ? 'border-red-500' : 'border-gray-300'}`}
				/>
				{error && <p className='text-red-500'>{error}</p>}
				<Button className='rounded-full' disabled={isLoading || isOverLimit}>
					{isLoading ? 'Posting...' : 'Post'}
				</Button>
			</div>
		</form>
	);
};

export default AddCommentForm;
