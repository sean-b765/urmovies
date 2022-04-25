import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import misc from './slices/misc'
import media from './slices/media'
import auth from './slices/auth'
import comments from './slices/comments'
import notifications from './slices/notifications'
import socketMiddleware from './middleware/socket'

export function makeStore() {
	return configureStore({
		reducer: {
			misc,
			media,
			auth,
			comments,
			notifications,
		},
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(socketMiddleware),
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
