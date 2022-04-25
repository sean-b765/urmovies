import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
	fetchCommentsThunk,
	postCommentThunk,
} from '../../store/actions/comments'
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

	const [comment, setComment] = useState({ message: '' })

	function handlePost() {
		dispatch(postCommentThunk({ commentSectionId, message: comment.message }))
	}

	return (
		<section className="comments">
			{!pending ? (
				<>
					{
						<form
							onSubmit={(e: any) => {
								e.preventDefault()
								handlePost()
							}}
						>
							<textarea
								name="message"
								value={comment.message}
								onChange={(e) => setComment({ message: e.target.value })}
								id="message"
							></textarea>
							<input type="submit" value="Post" className="btn btn--post" />
						</form>
					}
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
