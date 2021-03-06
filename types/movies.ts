import { Cast, Genre, Images, Providers, TMDBReview } from './common'

interface ProductionCompany {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

interface ProductionCountry {
	iso_3166_1: string
	name: string
}

interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface MovieResult {
	adult?: boolean
	backdrop_path?: string
	belongs_to_collection?: any
	budget?: number
	genres_ids: number[]
	homepage?: string
	id?: number
	imdb_id?: string
	original_language?: string
	original_title?: string
	overview?: string
	popularity?: number
	poster_path?: string
	production_companies?: ProductionCompany[]
	production_countries?: ProductionCountry[]
	release_date?: string
	revenue?: number
	runtime?: number
	spoken_languages?: SpokenLanguage[]
	status?: string
	tagline?: string
	title?: string
	video?: boolean
	vote_average?: number
	vote_count?: number
	type?: 'tv' | 'movie'
	media_type?: 'tv' | 'movie'
}

export interface SingleMovieResult {
	success: boolean
	result: MovieResult
	reviews: TMDBReview[]
	images: Images
	providers: Providers
	cast: {
		id: number
		cast: Array<Cast>
		crew: Array<any>
	}
	recommendations?: {
		result: MovieResult[]
		success: boolean
	}
	ratings?: Array<{
		user: string
		rating: number
	}>
}
