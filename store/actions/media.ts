import API from '../../services/api'

export const getDiscover = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/discover/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getMedia = async (options: {
	mediaId: string
	media: 'tv' | 'movie'
}) => {
	const { media, mediaId } = options

	try {
		const result = await API.get(`/api/v1/media/${media}/${mediaId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getMediaPreview = async (options: {
	mediaId: string
	media: 'tv' | 'movie'
}) => {
	const { media, mediaId } = options

	try {
		const result = await API.get(`/api/v1/media/min/${media}/${mediaId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getRecommendations = async (options: {
	mediaId: string
	media: 'tv' | 'movie'
}) => {
	const { media, mediaId } = options

	try {
		const result = await API.get(`/api/v1/media/similar/${media}/${mediaId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getPopular = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/popular/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getPlaying = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/now-playing/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getTopRated = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/top-rated/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getMostRated = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/most-rated/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getUpcoming = async (options: {
	page: string
	media: 'tv' | 'movie'
	genres: string[]
}) => {
	const { media, page, genres } = options

	let _genres = genres.length !== 0 ? `genres=${genres.join(',')}` : ''

	if (page) _genres = `&${_genres}`
	else _genres = `?${_genres}`

	try {
		const result = await API.get(
			`/api/v1/media/upcoming/${media}${page}${_genres}`
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const setRating = async (
	media: string,
	mediaId: string,
	rating: number
) => {
	try {
		const result = await API.post(`/api/v1/media/${mediaId}/rate/${media}`, {
			rating,
		})
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const getRatings = async (media: string, mediaId: string) => {
	try {
		const result = await API.get(`/api/v1/media/${mediaId}/ratings/${media}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}
