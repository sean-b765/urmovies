import { AxiosError } from 'axios'
import { logout } from '../slices/auth'

import store from '../store'

/**
 * Any API routes which require authentication will check JWT and see if user needs to login again
 * @param error
 */
export async function checkAxiosError(error: AxiosError) {
	switch (error.response?.data?.error) {
		case 'Token expired':
		case 'No JWT supplied':
		case 'You must login again':
		case 'Your user account was deleted':
			store.dispatch(logout())
			break
		default:
			break
	}
}
