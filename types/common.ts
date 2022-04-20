import { MovieResult } from './movies'
import { TVResult } from './tv'

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

export interface Backdrop {
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

export interface Poster {
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

export interface Rating {
	api_id: string
	media_type: 'movie' | 'tv'
	created_at: string
	updated_at: string
	rating: number
	user: string
}

export interface Cast {
	adult?: boolean
	gender?: number | null
	id?: number
	known_for_department?: string
	name?: string
	original_name?: string
	popularity?: string
	profile_path?: string | null
	cast_id?: number
	character?: string
	credit_id?: string
	order?: number
}

export interface CastObjectMovie extends MovieResult {
	character?: string
}
export interface CastObjectTV extends TVResult {
	character?: string
	episode_count?: number
}

export interface CrewObjectBase extends MovieResult {
	job?: string
	department?: string
}

export interface Person {
	credits: {
		cast?: Array<CastObjectMovie | CastObjectTV>
		crew?: Array<CrewObjectBase>
	}
	result: {
		adult?: boolean
		also_known_as?: string[]
		biography?: string
		deathday?: string | null
		birthday?: string
		gender?: number
		homepage?: string
		id?: number
		imdb_id?: string
		known_for_department?: string
		name?: string
		place_of_birth?: string
		popularity?: number
		profile_path?: string
	}
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
