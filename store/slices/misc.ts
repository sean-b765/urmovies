import { createSlice } from '@reduxjs/toolkit'
import { getGeolocationThunk } from '../actions/geoloc'

export interface InitialDataState {
	country_code: string
	time_zone: string
	lang: string
	loading: boolean
	isEstablishing: boolean
	isConnected: boolean
}

const initialState: InitialDataState = {
	country_code: '',
	time_zone: '',
	lang: 'en',
	loading: false,
	isEstablishing: false,
	isConnected: false,
}

export const miscSlice = createSlice({
	name: 'misc',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload
		},
		establishSocketConnection(state) {
			state.isEstablishing = true
		},
		socketConnected(state) {
			state.isConnected = true
			state.isEstablishing = true
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

export const { setLoading, establishSocketConnection, socketConnected } =
	miscSlice.actions

export default miscSlice.reducer
