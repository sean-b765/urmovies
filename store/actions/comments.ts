import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../services/api'

export async function getComments(options: { commentSectionId: string }) {
	const { commentSectionId } = options
	try {
		const result = await API.get(`/api/v1/comment/thread/${commentSectionId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const fetchCommentsThunk = createAsyncThunk(
	'comments/fetch',
	getComments
)

export async function postComment(options: {
	commentSectionId: string
	message: string
}) {
	const { commentSectionId, message } = options
	try {
		const result = await API.post(
			`/api/v1/comment/thread/${commentSectionId}`,
			{ message }
		)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const postCommentThunk = createAsyncThunk('comments/post', postComment)

export async function editComment(options: {
	commentId: string
	message: string
}) {
	const { commentId, message } = options
	try {
		const result = await API.patch(`/api/v1/comment/${commentId}`, { message })
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const editCommentThunk = createAsyncThunk('comments/edit', editComment)

export async function deleteComment(options: { commentId: string }) {
	const { commentId } = options
	try {
		const result = await API.delete(`/api/v1/comment/${commentId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const deleteCommentThunk = createAsyncThunk(
	'comments/delete',
	deleteComment
)

export async function likeComment(options: { commentId: string }) {
	const { commentId } = options
	try {
		const result = await API.patch(`/api/v1/comment/${commentId}/like`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const likeCommentThunk = createAsyncThunk(
	'comments/toggle-like',
	likeComment
)

export async function dislikeComment(options: { commentId: string }) {
	const { commentId } = options
	try {
		const result = await API.patch(`/api/v1/comment/${commentId}/dislike`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const dislikeCommentThunk = createAsyncThunk(
	'comments/toggle-dislike',
	dislikeComment
)

export async function replyToComment(options: {
	commentId: string
	message: string
}) {
	const { commentId, message } = options
	try {
		const result = await API.post(`/api/v1/comment/${commentId}/reply`, {
			message,
		})
		return result.data
	} catch (err) {
		return { success: false }
	}
}

export const replyToCommentThunk = createAsyncThunk(
	'comments/add-reply',
	replyToComment
)
