import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getGeolocation = createAsyncThunk('data/fetch', async () => {
	try {
		const result = await axios.get(
			'https://urmovies.herokuapp.com/api/v1/misc/geoip'
		)
		return result.data
	} catch (error) {
		return { success: false }
	}
})
