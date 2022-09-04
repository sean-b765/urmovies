import { PayloadAction } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client'
import { logout, setProfile, setToken } from '../slices/auth'
import { establishSocketConnection, socketConnected } from '../slices/misc'
import {
	addNotification,
	Notification,
	setNotifications,
	setPopup,
} from '../slices/notifications'

const socketMiddleware: Middleware = (store) => {
	let socket: Socket

	return function wrapDispatch(next) {
		return function handleAction(action: PayloadAction) {
			const state = store.getState()

			const auth = state?.auth

			const isConnected = state?.misc?.isConnected && socket.connected

			console.log(action.type)

			// When establishSocketConnection() is dispatched, we initialize socket
			// 	Only establish a connection if the user is authenticated
			if (establishSocketConnection.match(action)) {
				socket = io('https://urmovies.herokuapp.com')
				// socket = io('http://localhost:5000')

				// Authenticate on connected event
				socket.on('connected', () => {
					store.dispatch(socketConnected())
					socket.emit('authenticate', {
						token: auth?.token,
					})
				})

				/**
				 * Events below
				 */

				// Token is checked when establishing socket connection as well
				//  on expired-token event user should be logged out
				socket.on('expired-token', (data) => {
					console.log(data)

					// console.log('FORCE LOGOUT')

					// store.dispatch(logout())
				})

				// Receive notifications from host after being authenticated
				socket.on('receive-notifications', (notifs) => {
					if (notifs?.notifications?.length)
						store.dispatch(
							setNotifications(notifs.notifications as Array<Notification>)
						)
					console.log('received notifications', notifs.notifications)
				})

				// Comment-liked event
				socket.on('comment-liked', (data) => {
					store.dispatch(addNotification(data))
					store.dispatch(setPopup(data))
				})
			}

			// setToken calls when JWT is received from server
			//  Authenticate this JWT with socket to be identified
			if (setToken.match(action) && isConnected) {
				socket.emit('authenticate', {
					token: action.payload,
				})
			}

			next(action)
		}
	}
}

export default socketMiddleware
