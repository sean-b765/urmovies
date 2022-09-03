import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

export interface Notification {
	message: string
	title: string
	read: boolean
	sender: any
	created_at: string
	updated_at: string
	_id: string
	href: string | null
}

export interface InitialDataState {
	popup: Notification | null
	read: Array<Notification>
	unread: Array<Notification>
	pending: boolean
}

const initialState: InitialDataState = {
	popup: null,
	read: [],
	unread: [],
	pending: false,
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		setNotifications(state, action: PayloadAction<Array<Notification>>) {
			state.read = action.payload.filter((alert) => alert.read)
			state.unread = action.payload.filter((alert) => !alert.read)
		},
		addNotification(state, action: PayloadAction<Notification>) {
			action.payload.read
				? (state.read = [action.payload, ...state.read])
				: (state.unread = [action.payload, ...state.unread])
		},
		markRead(state, action: PayloadAction<Notification>) {
			state.read = [action.payload, ...state.read]
			state.unread = state.unread.filter(
				(notif) => notif._id !== action.payload._id
			)
		},
		setPopup(state, action: PayloadAction<Notification>) {
			state.popup = action.payload
		},
		dismissPopup(state) {
			state.popup = null
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchCommentsThunk.pending, (state) => {
	// 			state.pending = true
	// 		})
	// 		.addCase(fetchCommentsThunk.fulfilled, (state, action) => {
	// 			state.pending = false

	// 			const comments = [] as Array<Comment>
	// 			const replies = [] as Array<Reply>

	// 			action.payload.result.map((cmt: any) =>
	// 				cmt?.parent_id ? replies.push(cmt) : comments.push(cmt)
	// 			)

	// 			state.comments = comments
	// 			state.replies = replies
	// 		})
	// },
})

export const {
	setNotifications,
	addNotification,
	markRead,
	setPopup,
	dismissPopup,
} = notificationsSlice.actions

export default notificationsSlice.reducer
