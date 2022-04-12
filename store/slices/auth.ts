import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InitialDataState {
	token: string
	profile: string
}

const initialState: InitialDataState = {
	token: '',
	profile: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
})

export const {} = authSlice.actions

export default authSlice.reducer
