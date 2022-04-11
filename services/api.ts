import axios from 'axios'
import emitter from './eventEmitter'

const API = axios.create({ baseURL: 'https://urmovies.herokuapp.com' })
// const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
	emitter.emit('AXIOS_START', null)
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
