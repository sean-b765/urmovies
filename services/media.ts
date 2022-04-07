import API from './api'

export const getDiscover = async (page: string, media: 'tv' | 'movie') => {
	try {
		const result = await API.get(`/api/v1/media/discover/${media}${page}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getMedia = async (mediaId: string, media: 'tv' | 'movie') => {
	try {
		const result = await API.get(`/api/v1/media/${media}/${mediaId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getRecommendations = async (
	mediaId: string,
	media: 'tv' | 'movie'
) => {
	try {
		const result = await API.get(`/api/v1/media/similar/${media}/${mediaId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}
