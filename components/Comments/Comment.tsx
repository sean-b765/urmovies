import Image from 'next/image'
import React, { useState } from 'react'
import { Comment, Reply } from '../../types/common'
import { motion } from 'framer-motion'
import moment from 'moment'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	MdDelete,
	MdEdit,
	MdOutlineEdit,
	MdOutlineEditOff,
} from 'react-icons/md'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import {
	deleteCommentThunk,
	editCommentThunk,
	likeComment,
} from '../../store/actions/comments'
import { marked } from 'marked'
import renderer from '../../lib/marked'
import { BsCheck2 } from 'react-icons/bs'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'

const CommentCard: React.FC<{
	comment: Comment | Reply
	showThread?: boolean
	hasReplies?: boolean
	setShowThread: Function
}> = ({ showThread = true, comment, setShowThread, hasReplies }) => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.auth.profile)

	const [toggleOptions, setToggleOptions] = useState(false)

	const [edit, setEdit] = useState({ editing: false, message: '' })

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

					{user?._id && user?._id === comment.author?._id && (
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
										onClick={() =>
											dispatch(deleteCommentThunk({ commentId: comment._id }))
										}
									>
										<MdDelete />
									</button>
									<button
										className="btn btn--circle btn--edit"
										onClick={() =>
											setEdit({
												editing: !edit.editing,
												message: comment.message,
											})
										}
									>
										{edit?.editing ? <MdOutlineEditOff /> : <MdOutlineEdit />}
									</button>
									{edit?.editing && (
										<button
											className="btn btn--circle btn--submit"
											onClick={() => {
												dispatch(
													editCommentThunk({
														commentId: comment._id,
														message: edit.message,
													})
												)
												setEdit({ editing: false, message: '' })
											}}
										>
											<BsCheck2 />
										</button>
									)}
								</motion.div>
							)}
						</div>
					)}
				</div>

				<p className="timestamp">
					{moment(comment?.created_at).fromNow()}{' '}
					{comment?.last_edit && (
						<span>(edited {moment(comment?.last_edit).fromNow()})</span>
					)}
				</p>
			</header>

			{edit.editing ? (
				<textarea
					className={showThread ? 'message' : 'message message--collapsed'}
					value={edit.message}
					onChange={(e) => setEdit({ ...edit, message: e.target.value })}
					style={{
						resize: 'none',
						width: 'calc(100% - 2rem)',
						padding: '.15rem .5rem',
						height: '4rem',
						border: 'none',
					}}
				/>
			) : (
				<p
					className={showThread ? 'message' : 'message message--collapsed'}
					dangerouslySetInnerHTML={{
						__html: marked.parse(comment.message.replace(/\n/g, '\\\n'), {
							renderer,
						}),
					}}
				></p>
			)}

			{comment.author?._id !== user?._id && (
				<>
					<div className="comment__likes">
						<button
							className="btn btn--like btn--opaque"
							onClick={async () => {
								await likeComment({ commentId: comment._id })
							}}
						>
							<AiOutlineLike />
						</button>
						<button className="btn btn--dislike btn--opaque">
							<AiOutlineDislike />
						</button>
					</div>
				</>
			)}
		</motion.div>
	)
}

export default CommentCard
