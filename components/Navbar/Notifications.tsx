import React from 'react'
import { AiFillBell } from 'react-icons/ai'
import { useAppSelector } from '../../store/hooks'

const Notifications = () => {
	const { notifications } = useAppSelector((state) => state.notifications)

	return (
		<div className="notifications">
			<AiFillBell />
			{notifications.length}
		</div>
	)
}

export default Notifications
