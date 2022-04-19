import API from '../../services/api'

export async function signup(formData: {
	username: string
	email: string
	password: string
}) {
	try {
		const result = await API.post('/api/v1/auth/signup', {
			...formData,
		})
		return result.data
	} catch (error: any) {
		return error?.response?.data || { success: false }
	}
}

export async function login(formData: {
	username: string
	email: string
	password: string
}) {
	try {
		const result = await API.post('/api/v1/auth/login', {
			...formData,
		})
		return result.data
	} catch (error: any) {
		return error?.response?.data || { success: false }
	}
}
