import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetchCommentsThunk } from '../../store/actions/comments'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Thread from './Thread'

const CommentSection: React.FC<{ commentSectionId: string }> = ({
	commentSectionId,
}) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			fetchCommentsThunk({
				commentSectionId,
			})
		)
	}, [])

	const { comments, replies, pending } = useAppSelector(
		(state) => state.comments
	)

	return (
		<section className="comments">
			{!pending ? (
				<>
					{comments.map((comment, idx) => {
						return (
							<Thread
								key={idx}
								comment={comment}
								replies={replies.filter(
									(potentialReply) => potentialReply.parent_id === comment._id
								)}
							/>
						)
					})}
				</>
			) : (
				<>
					<p>Loading</p>
				</>
			)}
		</section>
	)
}

export default CommentSection
