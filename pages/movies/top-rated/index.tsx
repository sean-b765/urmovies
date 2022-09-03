import axios from 'axios'
import { NextPage } from 'next'
import React from 'react'
import List from '../../../components/List'
import Pages from '../../../components/Pagination'
import { getTopRated } from '../../../store/actions/media'
import { MovieResult } from '../../../types/movies'

const TopMovies: NextPage<{
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

			<Pages page={data.page} pages={data.pages} />
		</>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page
	const genres = context?.query?.genres?.split(',') || []

	const movies = await getTopRated({
		page: page ? `?page=${page}` : '',
		media: 'movie',
		genres,
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

export default TopMovies
