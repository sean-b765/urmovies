import Image from 'next/image'
import React, { useState } from 'react'
import { Comment, Reply } from '../../types/common'
import { motion } from 'framer-motion'
import moment from 'moment'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { MdDelete, MdEdit } from 'react-icons/md'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const CommentCard: React.FC<{
	comment: Comment | Reply
	showThread?: boolean
	hasReplies?: boolean
	setShowThread: Function
}> = ({ showThread = true, comment, setShowThread, hasReplies }) => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.auth.profile)

	const [toggleOptions, setToggleOptions] = useState(false)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="comment"
		>
			<header className="comment__user" data-collapsible>
				<div>
					{!comment.parent_id && hasReplies ? (
						<button
							className="btn btn--collapse"
							onClick={() => setShowThread()}
						>
							{showThread ? '[-]' : '[+]'}
						</button>
					) : (
						<></>
					)}

					<Image
						style={{ borderRadius: '50%' }}
						src={
							comment?.author?.avatar
								? comment?.author?.avatar
								: '/default-avatar.jpg'
						}
						className="comment__user__pic"
						width={30}
						height={30}
					/>
					{!comment.author?.username ? (
						<p>[deleted]</p>
					) : (
						<Link href={`/users/${comment?.author?.username}`}>
							<a>{comment.author?.username}</a>
						</Link>
					)}

					{user?._id === comment.author?._id && (
						<div className="comment_controls">
							<button
								className="btn btn--options"
								onClick={() => setToggleOptions(!toggleOptions)}
							>
								<BiDotsHorizontalRounded />
							</button>
							{toggleOptions && (
								<motion.div
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.4 }}
									className="controls"
								>
									<button
										className="btn btn--circle btn--delete"
										// onClick={() => deleteComment()}
									>
										<MdDelete />
									</button>
									<button className="btn btn--circle btn--edit">
										<MdEdit />
									</button>
								</motion.div>
							)}
						</div>
					)}
				</div>

				<p className="timestamp">{moment(comment?.created_at).fromNow()}</p>
			</header>

			<p className={showThread ? 'message' : 'message message--collapsed'}>
				{comment.message}
			</p>
		</motion.div>
	)
}

export default CommentCard
