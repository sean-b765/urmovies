import {
	CastObjectMovie,
	CastObjectTV,
	CountryCode,
	Genre,
	Provider,
} from '../types/common'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatDate } from './format'
import { movieGenres, tvGenres } from '../lib/genres'
import { langCodes } from './languages'

export const getTitle = (media: TVResult | MovieResult) => {
	if (!media) return ''

	if ('title' in media) return media?.title
	if ('name' in media) return media?.name
	return ''
}

export const getDate = (media: TVResult | MovieResult) => {
	if (!media) return ''

	let date = ''
	if ('release_date' in media) date = formatDate(media.release_date as string)
	if ('first_air_date' in media) {
		date = `${formatDate(media.first_air_date as string)}`
	}

	return date
}

export const getEpisodeCount = (media: CastObjectTV) => {
	if (!media) return ''

	if ('episode_count' in media)
		return media.episode_count ? media.episode_count : ''
}

export const getMediaType = (media: TVResult | MovieResult): string => {
	if (!media) return ''

	if ('media_type' in media) return `${media.media_type}`
	if ('type' in media) return `${media.type}`
	return ''
}

export const getGenreIds = (
	media: TVResult | MovieResult
): Genre[] | number[] => {
	if (!media) return []

	if ('genre_ids' in media) return media.genre_ids ? media.genre_ids : []
	if ('genres' in media) return media.genres ? media.genres : []
	return []
}

export const getGenreName = (id: string, mediaType: string) => {
	const _id = Number(id)

	return mediaType === 'movie'
		? movieGenres.filter((genre) => genre.id === _id)[0]?.name
		: tvGenres.filter((genre) => genre.id === _id)[0]?.name
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

/**
 *
 * @param lang language code
 * @returns Language string (e.g. Portugese, English)
 */
export const getLanguageFromCode = (lang: string) => {
	const foundLang = langCodes.filter((lc) => lc.code === lang)[0]

	return foundLang && 'lang' in foundLang ? foundLang.lang : ''
}

export const getRuntime = (media: TVResult | MovieResult) => {
	if (!media) return 0

	if ('runtime' in media) return Number(media.runtime)
	if ('episode_run_time' in media)
		return Number((media.episode_run_time as number[])[0] || 0)
	return 0
}

export const getRevenue = (media: TVResult | MovieResult) => {
	if (!media) return 0

	if ('revenue' in media) return Number(media.revenue)
	return 0
}

export const getBudget = (media: TVResult | MovieResult) => {
	if (!media) return 0

	if ('budget' in media) return Number(media.budget)
	return 0
}
