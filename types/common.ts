export interface Genre {
	id: number
	name: string
}

export interface Provider {
	display_priority: number
	logo_path: string
	provider_id: number
	provider_name: string
}

export interface CountryCode {
	link: string
	flatrate?: Provider[]
	buy?: Provider[]
	rent?: Provider[]
}

export interface Providers {
	[key: string]: CountryCode
}

interface Backdrop {
	aspect_ratio: number
	height: number
	iso_639_1: string
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

interface Logo {
	aspect_ratio: number
	height: number
	iso_639_1: string
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

interface Poster {
	aspect_ratio: number
	height: number
	iso_639_1: string
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

export interface Images {
	backdrops: Backdrop[]
	id: number
	logos: Logo[]
	posters: Poster[]
}

export interface TMDBReview {
	author: string
	author_details: {
		name: string
		username: string
		avatar_path: string
		rating?: number
	}
	content: string
	created_at: Date
	id: string
	updated_at: Date
	url: string
}
