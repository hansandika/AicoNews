'use client';

import { CommentInterface } from '@/common.types';
import { formatDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSWR from 'swr';

type Props = {
	slug: string
}

const CommentListItem = ({ slug }: Props) => {
	const getInitialComments = async (URL: string) => {
		const comments = await fetch(URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const commentsData = await comments.json()
		return commentsData
	}

	const { data } = useSWR(`/api/comments/${slug}`, getInitialComments)

	return (
		<div className='space-y-4'>
			{data?.length > 0 ? (
				data.map((comment: CommentInterface) => (
					<div key={`${comment.newsId}-${comment.userId}`} className='p-4 border rounded-lg bg-white shadow-sm flex space-x-4'>
						<Avatar>
							<AvatarImage
								src={comment.user.avatarUrl}
								alt={`${comment.user.name}'s profile picture`}
							/>
							<AvatarFallback>{comment.user.name.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className='flex-1'>
							<div className='flex justify-between items-center mb-2'>
								<strong className='text-lg font-semibold'>{comment.user.name}</strong>
								<span className='text-sm text-gray-500'>{formatDate(comment.createdAt)}</span>
							</div>
							<p className='text-gray-800'>{comment.message}</p>
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
