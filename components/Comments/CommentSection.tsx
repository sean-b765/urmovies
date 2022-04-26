import { AnimatePresence } from 'framer-motion'
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

	const { comments, replies, loading } = useAppSelector(
		(state) => state.comments
	)

	const [editComment, setEditComment] = useState({ message: '' })

	function handlePost() {
		dispatch(
			postCommentThunk({ commentSectionId, message: editComment.message })
		)
	}

	return (
		<section className="comments">
			{!loading ? (
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
								value={editComment.message}
								onChange={(e) => setEditComment({ message: e.target.value })}
								id="message"
							></textarea>
							<input type="submit" value="Post" className="btn btn--post" />
						</form>
					}
					<AnimatePresence>
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
					</AnimatePresence>
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
