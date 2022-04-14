import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getGeolocationThunk } from '../actions/geoloc'

export interface InitialDataState {
	country_code: string
	time_zone: string
	lang: string
	loading: boolean
}

const initialState: InitialDataState = {
	country_code: '',
	time_zone: '',
	lang: 'en',
	loading: false,
}

export const miscSlice = createSlice({
	name: 'misc',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getGeolocationThunk.pending, (state) => {})
			.addCase(getGeolocationThunk.fulfilled, (state, action) => {
				if (action.payload.message) return

				state.time_zone = action.payload?.result?.time_zone
				state.country_code = action.payload?.result?.country_code
			})
	},
})

export const { setLoading } = miscSlice.actions

export default miscSlice.reducer
