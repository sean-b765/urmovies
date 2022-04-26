import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { useAppSelector } from '../../store/hooks'
import Popup from './Popup'
import { motion } from 'framer-motion'
import NotificationCard from './NotificationCard'

const Notifications = () => {
	const { unread, read } = useAppSelector((state) => state.notifications)
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<div className="notifications">
				<button
					onClick={() => setShowModal(!showModal)}
					className={
						unread?.length
							? 'notifications__badge notifications__badge--unread btn btn--opaque'
							: 'notifications__badge btn btn--opaque'
					}
				>
					<AiFillBell />
					{unread?.length}
				</button>
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
			<AnimatePresence>
				{unread[0] && <Popup popup={unread[0]} />}
			</AnimatePresence>
		</>
	)
}

export default Notifications
