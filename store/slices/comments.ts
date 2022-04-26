import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment, Reply } from '../../types/common'
import {
	deleteCommentThunk,
	dislikeCommentThunk,
	editCommentThunk,
	fetchCommentsThunk,
	likeCommentThunk,
	postCommentThunk,
	replyToCommentThunk,
} from '../actions/comments'

export interface InitialDataState {
	comments: Array<Comment>
	replies: Array<Reply>
	pending: boolean
	loading: boolean
}

const initialState: InitialDataState = {
	comments: [],
	replies: [],
	pending: false,
	loading: true,
}

const patchLikes = (state: InitialDataState, action: PayloadAction<any>) => {
	state.pending = false
	if (!action?.payload?.success) return
	const isReply = action?.payload?.result?.parent_id

	if (isReply) {
		state.replies = state.replies.map((cmt: any) => {
			return cmt._id === action?.payload?.result?._id
				? {
						...cmt,
						likes: action?.payload?.result?.likes,
						dislikes: action?.payload?.result?.dislikes,
				  }
				: cmt
		})
	} else {
		state.comments = state.comments.map((cmt: any) => {
			return cmt._id === action?.payload?.result?._id
				? {
						...cmt,
						likes: action?.payload?.result?.likes,
						dislikes: action?.payload?.result?.dislikes,
				  }
				: cmt
		})
	}
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
				state.loading = true
			})
			.addCase(deleteCommentThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(editCommentThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(likeCommentThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(dislikeCommentThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(replyToCommentThunk.pending, (state) => {
				state.pending = true
			})
			.addCase(fetchCommentsThunk.fulfilled, (state, action) => {
				state.loading = false

				const comments = [] as Array<Comment>
				const replies = [] as Array<Reply>

				action.payload.result.map((cmt: any) =>
					cmt?.parent_id ? replies.push(cmt) : comments.push(cmt)
				)

				state.comments = comments
				state.replies = replies
			})
			.addCase(deleteCommentThunk.fulfilled, (state, action) => {
				state.pending = false

				// Deleted comment in DB
				if (action?.payload?.success && !action?.payload?.result) {
					state.comments = state.comments.filter(
						(comment) => !action?.payload?.deleted_ids?.includes(comment._id)
					)
					state.replies = state.replies.filter(
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
				state.pending = false
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
				state.pending = false
				if (!action?.payload?.success) return

				state.comments = [action.payload.result, ...state.comments]
			})
			.addCase(likeCommentThunk.fulfilled, patchLikes)
			.addCase(dislikeCommentThunk.fulfilled, patchLikes)
			.addCase(
				replyToCommentThunk.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.pending = false
					if (!action?.payload?.success) return

					state.replies = [action?.payload?.result, ...state.replies]
				}
			)
	},
})

export const { setComments, setReplies } = commentsSlice.actions

export default commentsSlice.reducer
