import API from '../../services/api'

export async function getPerson(personId: string) {
	try {
		const result = await API.get(`/api/v1/people/${personId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}
