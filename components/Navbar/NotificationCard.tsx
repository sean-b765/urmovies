import moment from 'moment'
import React from 'react'
import { Notification } from '../../store/slices/notifications'

const NotificationCard: React.FC<{
	notification: Notification
	className: string
}> = ({ notification, className }) => {
	return (
		<div className={className}>
			<header>
				<p>{notification.title}</p>
			</header>
			<p>"{notification.message}"</p>
			<p className="timestamp">{moment(notification.created_at).fromNow()}</p>
		</div>
	)
}

export default NotificationCard
