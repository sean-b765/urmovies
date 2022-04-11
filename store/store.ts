import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import misc from './slices/misc'
import media from './slices/media'

export function makeStore() {
	return configureStore({
		reducer: {
			misc,
			media,
		},
	})
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>

export default store
