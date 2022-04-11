import { CountryCode, Provider } from '../types/common'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'
import { formatDate } from './format'

export const getTitle = (media: TVResult | MovieResult) => {
	if ('title' in media) return media?.title
	if ('name' in media) return media?.name
	return ''
}

export const getDate = (media: TVResult | MovieResult) => {
	if ('release_date' in media) return formatDate(media.release_date as string)
	if ('first_air_date' in media && 'last_air_date' in media)
		return `${formatDate(media.first_air_date as string)}`

	return ''
}

export const getMediaType = (media: TVResult | MovieResult) => {
	if ('media_type' in media) return media.media_type
	if ('type' in media) return media.type
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
