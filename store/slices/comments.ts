import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment, Reply } from '../../types/common'
import { fetchCommentsThunk } from '../actions/comments'

export interface InitialDataState {
	comments: Array<Comment>
	replies: Array<Reply>
	pending: boolean
}

const initialState: InitialDataState = {
	comments: [],
	replies: [],
	pending: true,
}

export const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		setComments(state, action: PayloadAction<any>) {
			state.comments = action.payload
		},
		setReplies(state, action: PayloadAction<any>) {
			state.replies = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(fetchCommentsThunk.fulfilled, (state, action) => {
				state.pending = false

				const comments = [] as Array<Comment>
				const replies = [] as Array<Reply>

				action.payload.result.map((cmt: any) =>
					cmt?.parent_id ? replies.push(cmt) : comments.push(cmt)
				)

				state.comments = comments
				state.replies = replies
			})
	},
})

export const { setComments, setReplies } = commentsSlice.actions

export default commentsSlice.reducer
