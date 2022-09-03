import moment from 'moment'

/**
 * 780px width
 * @param str
 * @returns
 */
export const formatPic = (str: string) =>
	`https://image.tmdb.org/t/p/w780${str}`

/**
 * 1280xpx width
 * @param str
 * @returns
 */
export const formatPicOriginal = (str: string) =>
	`https://image.tmdb.org/t/p/w1280${str}`

/**
 * 300px width
 * @param str
 * @returns
 */
export const formatPicThumbs = (str: string) =>
	`https://image.tmdb.org/t/p/w300${str}`

export const formatDate = (YYYYMMDD: string) => {
	const date = moment(YYYYMMDD, 'YYYY-MM-DD').format('MMM YYYY')
	return date === 'Invalid date' ? 'Date TBD' : date
}

export const formatRatingClassName = (rating: any) =>
	Number(Number(rating).toFixed(1)) > 5
		? Number(Number(rating).toFixed(1)) > 7.5
			? 'green'
			: 'yellow'
		: 'red'

export const formatRatingNumber = (num: number): string | number =>
	num === 0 ? 'N/A' : num.toFixed(1)

export const formatLargeNumbers = (num: number) => {
	if (num > 1_000_000_000)
		return `${parseFloat(Number(num / 1000000000).toFixed(2))}B`
	if (num > 1_000_000) return `${parseFloat(Number(num / 1000000).toFixed(2))}M`
	else if (num > 100_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else if (num > 10_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else if (num > 1_000) return `${parseFloat(Number(num / 1000).toFixed(1))}K`
	else return `${num}`
}

export const formatLargeText = (str: string, max: number) => {
	return `${str.substring(0, max)}${str.length > max ? '...' : ''}`
}
