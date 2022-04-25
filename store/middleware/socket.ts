import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client'
import { establishSocketConnection, socketConnected } from '../slices/misc'
import {
	addNotification,
	Notification,
	setNotifications,
} from '../slices/notifications'

const socketMiddleware: Middleware = (store) => {
	let socket: Socket

	return function wrapDispatch(next) {
		return function handleAction(action) {
			console.log(store.getState())

			const authSlice = store.getState()?.auth

			// When establishSocketConnection() is dispatched, we initialize socket
			// 	Only establish a connection if the user is authenticated
			if (establishSocketConnection.match(action) && authSlice?.token) {
				socket = io('http://localhost:5000')

				socket.on('connected', () => {
					console.log('socket connection established')

					store.dispatch(socketConnected())
					socket.emit('new-user', {
						userId: authSlice?.profile?._id,
						token: authSlice?.token,
					})
				})

				socket.on('receive-notifications', (notifs) => {
					if (notifs?.notifications?.length)
						store.dispatch(
							setNotifications(notifs.notifications as Array<Notification>)
						)
				})

				socket.on('comment-liked', (data) => {
					store.dispatch(addNotification({ message: data }))
				})
			}

			next(action)
		}
	}
}

export default socketMiddleware
