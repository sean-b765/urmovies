import API from '../../services/api'

export async function getUser(name: string) {
	try {
		const user = (await API.get(`/api/v1/user/${name}`)).data
		return user
	} catch (err: any) {
		return err?.response?.data
	}
}
