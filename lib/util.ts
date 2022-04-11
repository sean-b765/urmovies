import { CountryCode, Provider } from '../types/common'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatDate } from './format'
import { movieGenres, tvGenres } from '../lib/genres'
import media from '../store/slices/media'
import { langCodes } from './languages'

export const getTitle = (media: TVResult | MovieResult) => {
	if ('title' in media) return media?.title
	if ('name' in media) return media?.name
	return ''
}

export const getDate = (media: TVResult | MovieResult) => {
	let date = ''
	if ('release_date' in media) date = formatDate(media.release_date as string)
	if ('first_air_date' in media) {
		date = `${formatDate(media.first_air_date as string)}`
	}

	return date
}

export const getMediaType = (media: TVResult | MovieResult): string => {
	if ('media_type' in media) return `${media.media_type}`
	if ('type' in media) return `${media.type}`
	return ''
}

export const getGenreIds = (media: TVResult | MovieResult) => {
	if ('genre_ids' in media) return media.genre_ids
}

export const getGenreName = (id: string, mediaType: string) => {
	const _id = Number(id)
	return mediaType === 'movie'
		? movieGenres.filter((genre) => genre.id === _id)[0]
		: tvGenres.filter((genre) => genre.id === _id)[0]
}

export const getProviders = (cc: CountryCode) => {
	let output = {
		buy: [] as Provider[],
		flatrate: [] as Provider[],
		rent: [] as Provider[],
	}
	if (cc === undefined) return output

	if ('flatrate' in cc) output.flatrate = cc.flatrate as Provider[]
	if ('buy' in cc) output.buy = cc.buy as Provider[]
	if ('rent' in cc) output.rent = cc.rent as Provider[]

	return output
}

export const getLanguageFromCode = (lang: string) => {
	return langCodes.filter((lc) => lc.code === lang)[0].lang
		? langCodes.filter((lc) => lc.code === lang)[0].lang
		: ''
}
