'use client';

import React from 'react';
import { CommentInterface, SessionInterface } from '@/common.types';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSWR, { mutate } from 'swr';
import { FaTrashAlt } from 'react-icons/fa';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from './ui/alert-dialog';
import { Button } from './ui/button';

type Props = {
	slug: string;
	session: SessionInterface;
}

const CommentListItem = ({ slug, session }: Props) => {
	const getInitialComments = async (URL: string) => {
		const comments = await fetch(URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const commentsData = await comments.json();
		return commentsData;
	}

	const { data, mutate: mutateSWR } = useSWR(`/api/comments/${slug}`, getInitialComments);

	const handleDeleteComment = async (commentId: string) => {
		// Optimistic UI Update
		const newComments = data?.filter((comment: CommentInterface) => comment.id !== commentId);
		mutate(`/api/comments/${slug}`, newComments, false);

		try {
			const response = await fetch(`/api/comments/${slug}/${commentId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				mutateSWR();
			} else {
				mutate(`/api/comments/${slug}`, data, false);
				console.error('Failed to delete the comment.');
			}
		} catch (error) {
			mutate(`/api/comments/${slug}`, data, false);
			console.error('An error occurred while deleting the comment:', error);
		}
	};

	return (
		<div className='space-y-4'>
			{data?.length > 0 ? (
				data.map((comment: CommentInterface) => (
					<div key={comment.id} className='p-4 border rounded-lg bg-gray-50 shadow-sm flex space-x-4 items-start'>
						<Avatar className='flex-shrink-0'>
							<AvatarImage
								src={comment.user.avatarUrl}
								alt={`${comment.user.name}'s profile picture`}
							/>
							<AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className='flex-1'>
							<div className='flex flex-col space-y-1'>
								<div className='flex items-center justify-between'>
									<strong className='text-lg font-semibold'>{comment.user.name}</strong>
									{session?.user?.id === comment.userId && (
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													variant='ghost'
													size='icon'
													className='text-gray-400 hover:text-red-600 transition-all'
													aria-label='Delete comment'
												>
													<FaTrashAlt size={16} />
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Delete Comment</AlertDialogTitle>
													<AlertDialogDescription>
														Are you sure you want to delete this comment? This action cannot be undone.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel asChild>
														<Button variant='outline'>Cancel</Button>
													</AlertDialogCancel>
													<AlertDialogAction asChild>
														<Button variant='destructive' onClick={() => handleDeleteComment(comment.id)}>
															Delete
														</Button>
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									)}
								</div>
								<span className='text-sm text-gray-500'>{formatDate(comment.createdAt)}</span>
								<p className='text-gray-700'>{comment.message}</p>
							</div>
						</div>
					</div>
				))
			) : (
				<p className='text-gray-600'>No comments yet.</p>
			)}
		</div>
	);
};

export default CommentListItem;
