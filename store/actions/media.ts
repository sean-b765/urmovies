import { createAsyncThunk } from '@reduxjs/toolkit'
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
