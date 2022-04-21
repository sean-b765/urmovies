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

export async function postComment(commentSectionId: string, message: string) {
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

export async function deleteComment(commentId: string) {
	try {
		const result = await API.delete(`/api/v1/comment/${commentId}`)
		return result.data
	} catch (err) {
		return { success: false }
	}
}
