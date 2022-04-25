import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment, Reply } from '../../types/common'
import {
	deleteCommentThunk,
	editCommentThunk,
	fetchCommentsThunk,
	postCommentThunk,
} from '../actions/comments'

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
			.addCase(deleteCommentThunk.fulfilled, (state, action) => {
				// Deleted comment in DB
				if (action?.payload?.success && !action?.payload?.result) {
					state.comments = state.comments.filter(
						(comment) => !action?.payload?.deleted_ids?.includes(comment._id)
					)
				}
				// Removed comment - kept replies
				if (action?.payload?.success && action?.payload?.result) {
					state.comments = state.comments.map((comment) => {
						return comment._id === action?.payload?.result?._id
							? action?.payload?.result
							: comment
					})
				}
			})
			.addCase(editCommentThunk.fulfilled, (state, action) => {
				if (!action?.payload?.success) return

				state.comments = state.comments.map((comment) => {
					return comment._id === action?.payload?.result?._id
						? {
								...comment,
								message: action?.payload?.result?.message,
								last_edit: action?.payload?.result?.last_edit,
						  }
						: comment
				})
			})
			.addCase(postCommentThunk.fulfilled, (state, action) => {
				if (!action?.payload?.success) return

				state.comments = [...state.comments, action.payload.result]
			})
	},
})

export const { setComments, setReplies } = commentsSlice.actions

export default commentsSlice.reducer
