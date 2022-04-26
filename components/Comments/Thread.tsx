import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { Comment, Reply } from '../../types/common'
import CommentCard from './Comment'
import { motion } from 'framer-motion'

const Thread: React.FC<{
	comment: Comment
	replies: Reply[]
}> = ({ comment, replies }) => {
	const [showThread, setShowThread] = useState(true)

	return (
		<motion.div
			className="thread"
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
		>
			<CommentCard
				comment={comment}
				showThread={showThread}
				hasReplies={Boolean(replies.length)}
				setShowThread={() => setShowThread(!showThread)}
			/>

			{showThread &&
				replies.map((reply, idx) => (
					<CommentCard
						comment={reply}
						key={idx}
						setShowThread={() => {}}
					></CommentCard>
				))}
		</motion.div>
	)
}

export default Thread
