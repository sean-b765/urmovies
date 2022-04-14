import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MovieResult, SingleMovieResult } from '../../types/movies'
import { SingleTVResult, TVResult } from '../../types/tv'

export interface InitialDataState {
	single: SingleMovieResult | SingleTVResult
	preview: MovieResult | TVResult
	showPreview: boolean
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
	},
})

export const { setSingle, setPreview, removePreview } = mediaSlice.actions

export default mediaSlice.reducer
