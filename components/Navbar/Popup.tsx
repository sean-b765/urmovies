import React, { useEffect } from 'react'
import { markRead, Notification } from '../../store/slices/notifications'
import { motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { useAppDispatch } from '../../store/hooks'

const Popup: React.FC<{ popup: Notification }> = ({ popup }) => {
	const dispatch = useAppDispatch()

	return (
		<motion.div
			initial={{ opacity: 0, y: -15 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: 30 }}
			transition={{ duration: 0.4 }}
			className="alert"
		>
			<button
				className="btn btn--close"
				onClick={() => dispatch(markRead(popup))}
			>
				<MdClose />
			</button>
			<div>
				<h2>{popup?.title}</h2>
				<p>"{popup?.message}"</p>
			</div>
		</motion.div>
	)
}

export default Popup
