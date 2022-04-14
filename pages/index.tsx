import { NextPage } from 'next'
import React from 'react'
import List from '../components/List'
import { getDiscover } from '../store/actions/media'
import { MovieResult } from '../types/movies'
import { TVResult } from '../types/tv'

interface Props {
	result: MovieResult[] | TVResult[]
	success: boolean
	page: number
	pages: number
}

const Discover: NextPage<{ data: Props }> = ({ data }) => {
	return (
		<>
			{!data?.success ? <></> : <List data={{ result: data.result }} />}
			<div className="pagination">
				{data.page} of {data.pages}
			</div>
		</>
	)
}

export async function getServerSideProps(context: any) {
	const page = context.query.page
	const genres = context?.query?.genres?.split(',') || []

	let result = []
	const movies = await getDiscover({
		page: page ? `?page=${page}` : '',
		media: 'movie',
		genres,
	})
	const tv = await getDiscover({
		page: page ? `?page=${page}` : '',
		media: 'tv',
		genres,
	})

	if (!movies.success || !tv.success)
		return {
			props: {
				success: false,
			},
		}

	if (movies.page !== tv.page)
		return {
			props: {
				success: false,
			},
		}

	result = [
		...movies.result.map((movie: any) => {
			return { ...movie, type: 'movie' }
		}),
		...tv.result.map((tv: any) => {
			return { ...tv, type: 'tv' }
		}),
	].sort((ob1, ob2) => ob2.popularity - ob1.popularity)

	const success = movies.success && tv.success

	console.log(tv.pages, movies.pages)

	return {
		props: {
			data: {
				result,
				success,
				page: movies.page,
				pages: Math.min(
					500,
					tv.pages === 0 ? 500 : tv.pages,
					movies.pages === 0 ? 500 : movies.pages
				),
			},
		},
	}
}

export default Discover
