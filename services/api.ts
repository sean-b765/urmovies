import axios from 'axios'
import emitter from './eventEmitter'

const API = axios.create({ baseURL: 'https://urmovies.herokuapp.com' })
// const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
	try {
		// localStorage will be undefined for server-side requests
		// However if it isn't, we have access to the JWT and we will need to set the Authorization header
		if (localStorage) {
			const token = localStorage.getItem('authtoken') || ''
			if (token) {
				req.headers = { ...req.headers, Authorization: token }
			}
		}
	} catch (err) {}
	return req
})

API.interceptors.response.use(
	(res) => {
		emitter.emit('AXIOS_STOP', null)
		return res
	},
	(err) => {
		emitter.emit('AXIOS_STOP', null)
		throw err
	}
)

export default API
