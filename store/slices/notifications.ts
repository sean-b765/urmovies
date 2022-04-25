import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
	message: string
	title: string
	read: boolean
	sender: any
	created_at: string
	updated_at: string
	_id: string
}

export interface InitialDataState {
	notifications: Array<Notification>
	pending: boolean
}

const initialState: InitialDataState = {
	notifications: [],
	pending: true,
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		setNotifications(state, action: PayloadAction<any>) {
			state.notifications = action.payload
		},
		addNotification(state, action: PayloadAction<any>) {
			state.notifications?.push(action.payload)
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

export const { setNotifications, addNotification } = notificationsSlice.actions

export default notificationsSlice.reducer
