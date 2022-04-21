import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { Comment, Reply } from '../../types/common'
import CommentCard from './Comment'

const Thread: React.FC<{
	comment: Comment
	replies: Reply[]
}> = ({ comment, replies }) => {
	const [showThread, setShowThread] = useState(true)

	return (
		<div className="thread">
			<AnimatePresence>
				<CommentCard
					comment={comment}
					showThread={showThread}
					hasReplies={Boolean(replies.length)}
					setShowThread={() => setShowThread(!showThread)}
				/>
			</AnimatePresence>

			<AnimatePresence exitBeforeEnter>
				{showThread &&
					replies.map((reply, idx) => (
						<CommentCard
							comment={reply}
							key={idx}
							setShowThread={() => {}}
						></CommentCard>
					))}
			</AnimatePresence>
		</div>
	)
}

export default Thread
