import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialDataState {
	token: string
	profile?: {
		avatar: string | null
		username: string
		email: string
		reputation: number
		following: []
		followers: []
		_id: string
	} | null
}

const initialState: InitialDataState = {
	token: '',
	profile: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<any>) {
			if (action.payload === '') return

			state.token = action.payload

			localStorage.setItem('authtoken', action.payload)
		},
		setProfile(state, action: PayloadAction<any>) {
			state.profile = action.payload
			localStorage.setItem('userprofile', JSON.stringify(action.payload))
		},
	},
})

export const { setToken, setProfile } = authSlice.actions

export default authSlice.reducer
