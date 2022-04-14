import axios from 'axios'
import { NextPage } from 'next'
import React from 'react'
import List from '../../../components/List'
import { getPopular } from '../../../store/actions/media'
import { MovieResult } from '../../../types/movies'

const PopularMovies: NextPage<{
	data: {
		result: MovieResult[]
		success: boolean
		page: number
		pages: number
	}
}> = ({ data }) => {
	return (
		<>
			{!data?.success ? (
				<></>
			) : (
				<List data={{ result: data.result, type: 'movie' }} />
			)}

			<div className="pagination">
				{data?.page} of {data?.pages}
			</div>
		</>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page
	const genres = context?.query?.genres?.split(',') || []

	const data = (
		await axios.get('https://urmovies.herokuapp.com/api/v1/misc/geoip')
	).data

	const region =
		data?.success && data?.result?.country_code
			? data?.result?.country_code
			: 'us'

	const movies = await getPopular({
		page: page ? `?page=${page}` : '',
		media: 'movie',
		genres,
		region,
	})

	if (!movies || !movies.success)
		return {
			props: {
				success: false,
			},
		}

	return {
		props: {
			data: {
				result: movies.result,
				success: movies.success,
				page: movies.page,
				pages: Math.min(500, movies.pages === 0 ? 500 : movies.pages),
			},
		},
	}
}

export default PopularMovies
