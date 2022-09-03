import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { useAppSelector } from '../../store/hooks'
import { motion } from 'framer-motion'
import { Badge, IconButton, Menu, Tooltip } from '@mui/material'
import NotificationCard from './NotificationCard'

const Notifications = () => {
	const { unread, read } = useAppSelector((state) => state.notifications)
	const [showModal, setShowModal] = useState(false)

	return (
		<div className="notifications">
			<Tooltip
				title={
					unread?.length !== 0
						? `(${unread.length}) unread`
						: 'No new notifications'
				}
			>
				<IconButton
					aria-label="Show Notifications"
					color="inherit"
					size={'medium'}
					onClick={() => setShowModal(!showModal)}
					className={
						unread?.length
							? 'notifications__badge notifications__badge--unread btn btn--opaque'
							: 'notifications__badge btn btn--opaque'
					}
				>
					<Badge
						badgeContent={read?.length || ''}
						color={read?.length ? 'error' : 'info'}
					>
						<AiFillBell size={24} />
					</Badge>
				</IconButton>
			</Tooltip>

			<AnimatePresence>
				{showModal && (
					<motion.div
						initial={{ opacity: 0, y: -15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4 }}
						className="notifications__modal"
					>
						<div className="notifications__modal__controls"></div>
						<div className="wrapper">
							<div className="notifs">
								{unread.map((notif, idx) => {
									return (
										<NotificationCard
											className="notifs__item"
											notification={notif}
											key={idx}
										/>
									)
								})}
								{read.map((notif, idx) => {
									return (
										<NotificationCard
											className="notifs__item"
											notification={notif}
											key={idx}
										/>
									)
								})}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Notifications
