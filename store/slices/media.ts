import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Backdrop, Poster } from '../../types/common'
import { MovieResult, SingleMovieResult } from '../../types/movies'
import { SingleTVResult, TVResult } from '../../types/tv'

export interface InitialDataState {
	single: SingleMovieResult | SingleTVResult
	preview: MovieResult | TVResult
	fullscreenPic: Backdrop | Poster | null
	showPreview: boolean
	showFullscreenPic: boolean
}

const initialState: InitialDataState = {
	single: {
		images: {
			backdrops: [],
			id: 0,
			logos: [],
			posters: [],
		},
		providers: {},
		result: {},
		reviews: [],
		success: false,
		recommendations: {
			result: [],
			success: false,
		},
		cast: {
			cast: [],
			crew: [],
			id: 0,
		},
	},
	preview: {},
	showPreview: false,
	fullscreenPic: null,
	showFullscreenPic: false,
}

export const mediaSlice = createSlice({
	name: 'media',
	initialState,
	reducers: {
		setSingle(
			state,
			action: PayloadAction<SingleMovieResult | SingleTVResult>
		) {
			state.single = action.payload
		},
		setPreview(state, action: PayloadAction<MovieResult | TVResult>) {
			state.preview = action.payload
			state.showPreview = true
		},
		togglePreview(state) {
			state.showPreview = !state.showPreview
		},
		removePreview(state) {
			state.showPreview = false
		},
		setFullscreenPic(state, action: PayloadAction<Backdrop | Poster | null>) {
			state.fullscreenPic = action.payload
		},
		toggleFullscreenPic(state) {
			state.showFullscreenPic = !state.showFullscreenPic
		},
	},
})

export const {
	setSingle,
	setPreview,
	removePreview,
	setFullscreenPic,
	toggleFullscreenPic,
} = mediaSlice.actions

export default mediaSlice.reducer
