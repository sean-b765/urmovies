import moment from 'moment'

export const formatPic = (str: string) =>
	`https://image.tmdb.org/t/p/w780${str}`

export const formatPicOriginal = (str: string) =>
	`https://image.tmdb.org/t/p/w1280${str}`

export const formatPicThumbs = (str: string) =>
	`https://image.tmdb.org/t/p/w200${str}`

export const formatDate = (YYYYMMDD: string) =>
	moment(YYYYMMDD, 'YYYY-MM-DD').format('MMM YYYY')
